import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../../contexts";
import {cardCreate, cardDelete, cardsSlice, ICard, ICardPatch} from "../../store/cards";
import {appSlice, editorState, useAppDispatch, useAppSelector} from "../../store/app";
import {translateEnRu, translatorStatus} from "../../store/translator";
import {esc} from "./Alert";
import {
    black,
    borderRadius,
    fCenter,
    fixWidth,
    flex1,
    jAround,
    jBetween,
    jCenter,
    jEnd, lessTablet,
    m3,
    mb1,
    mr1,
    mt2,
    mv2,
    p1,
    primary,
    sides
} from "../../../const";
import {Flex, PressRow, Row} from "../../../lib/markup/markup";
import FA from "../../../lib/static/FA";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import TextMain from "../../../lib/text/TextMain";
import Select from "../../../lib/fields/Select";
import Btn from "../../../lib/buttons/Btn";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {TextInput} from "react-native";
import Toggle from "../../../lib/fields/Toggle";
import BtnPrimary from "../../../lib/buttons/BtnPrimary";
import {desksSlice} from "../../store/desks";
import {userSlice} from "../../store/user";
import Loading from "../../../lib/static/Loading";


export default function () {
    const {getCurrentCard, setAlert, getCurrentDesk} = useContext(AppContext)
    const card = getCurrentCard()
    const {editor} = useAppSelector(state => state.app)
    const desk = getCurrentDesk(editor === editorState.foundDesk)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.data)
    const {data: desks} = useAppSelector(state => state.desks)
    const {status: transStatus, result: translatorResult} = useAppSelector(state => state.translator)
    const {editDesk} = appSlice.actions
    const editable = desk.owner === user.id

    interface IState {
        card: ICard,
        statusMessage: string,
    }

    const initialState: IState = {
        card: editor === editorState.editCard ?
            {...card}
            :
            {id: null, desk: desk.id, side_one: '', side_two: '', step: null, next_show_in: null, lp_id: null},
        statusMessage: ''
    }

    const [state, setState] = useState(initialState);
    const [lastTranslatedText, setLastTranslatedText] = useState(state.card.side_one)
    const sideTwoRef = useRef()
    const sideOneRef = useRef()

    function patchCard(key) {
        if (editor === editorState.addCard || card[key] === state.card[key]) return
        const args: ICardPatch = {id: card.id, [key]: state.card[key]}
        dispatch(cardsSlice.actions.patch(args))
    }

    function translateTwo() {
        const text = state.card.side_one.trim()
        if (user.auto_translate && text.length && text != lastTranslatedText) {
            dispatch(translateEnRu(state.card.side_one))
            setLastTranslatedText(text)
        }
    }

    function updateState(args) {
        setState({...state, ...args})
    }

    function updateCardState(args) {
        updateState({card: {...state.card, ...args}})
    }

    function setUserProp(key) {
        dispatch(userSlice.actions.patch({id: user.id, [key]: !user[key]}))
    }

    function deleteCardRequest() {
        setAlert({
            title: 'удалить карту?',
            buttons: [
                {
                    title: 'удалить',
                    primary: true,
                    onPress: () => {
                        dispatch(cardDelete(card.id))
                    }
                },
                esc
            ]
        })
    }

    function toTheDesk() {
        dispatch(editDesk())
    }

    async function addCardRequest() {
        const card = state.card
        card.side_one = card.side_one.trim()
        card.side_two = card.side_two.trim()
        if (!card.side_one) {
            updateState({statusMessage: 'введите вопрос'})
            return
        } else if (!card.side_two) {
            updateState({statusMessage: 'введите ответ'})
            return
        }
        dispatch(cardCreate(card))
        updateState({
            card: {side_one: '', side_two: '', id: null, desk: desk.id},
            statusMessage: 'карта добавлена'
        })
        //@ts-ignore
        sideOneRef.current.focus()
    }

    function setCurrentDesk(deskId) {
        if (deskId === state.card.desk) return
        dispatch(desksSlice.actions.setCurrentDesk(deskId))
        if (editor === editorState.editDesk) return
        const args = {id: card.id, desk: deskId}
        dispatch(cardsSlice.actions.patch(args))
    }

    useEffect(() => {
        let isMounted = true
        if (transStatus === translatorStatus.done) {
            if (isMounted) updateCardState({side_two: translatorResult})
        }

        return () => {
            isMounted = false
        }
    }, [transStatus]);

    const myDesks = desks.filter(desk => desk.owner === user.id)
    if (!myDesks) {
        dispatch(appSlice.actions.addDesk())
        return null
    }

    return <Flex style={m3}>
        <Row style={[mb1, jBetween]}>
            <Row>
                <PressRow
                    style={[jCenter, fCenter, fixWidth(lessTablet() ? 40: 90)]}
                    onPress={toTheDesk}
                    visible={editor === editorState.editCard}
                >
                    <FA
                        icon={faArrowLeft}
                        // @ts-ignore
                        style={black}
                    />
                    <TextMain visible={!lessTablet()}>к колоде</TextMain>
                </PressRow>
                <Select
                    editable={editable}
                    items={myDesks.map((desk, _) => {
                        return {label: desk.name, value: desk.id}
                    })}
                    onChange={setCurrentDesk}
                    value={state.card.desk}
                />
            </Row>
            <Btn
                visible={editable && editorState.editCard === editor}
                title={faTrash}
                onPress={deleteCardRequest}
            />
        </Row>

        <TextInput
            autoFocus={true}
            ref={sideOneRef}
            editable={editable}
            placeholder={sides.one}
            value={state.card.side_one}
            onBlur={() => {
                translateTwo()
                patchCard('side_one')
            }}
            onChangeText={side_one => updateCardState({side_one})}
            // @ts-ignore
            style={[flex1, {backgroundColor: '#eeeeee'}, p1, fCenter, borderRadius]}
            numberOfLines={5}
            onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (['Enter', 'ArrowDown', 'Tab'].includes(keyValue) && !user.auto_translate) {
                    // @ts-ignore
                    setTimeout(() => sideTwoRef.current.focus(), 100)
                }
            }}
        />

        <Row style={[jAround, mv2]}>
            <Toggle
                text={'перевод'}
                selected={user.auto_translate}
                onPress={() => setUserProp('auto_translate')}
            />
            <Toggle
                text={'озвучка'}
                selected={user.auto_sound}
                onPress={() => setUserProp('auto_sound')}
            />
        </Row>

        {transStatus === translatorStatus.translating ?
            <Flex style={[jCenter, fCenter]}>
                <Loading/>
            </Flex>
            :
            <TextInput
                editable={editable}
                autoFocus={false}
                ref={sideTwoRef}
                placeholder={sides.two}
                value={state.card.side_two}
                onBlur={() => patchCard('side_two')}
                onChangeText={side_two => updateCardState({side_two})}
                // @ts-ignore
                style={[flex1, {backgroundColor: '#eeeeee'}, p1, fCenter, borderRadius]}
                numberOfLines={5}
                onKeyPress={({nativeEvent: {key: keyValue}}) => {
                    if (['Enter'].includes(keyValue)) {
                        // @ts-ignore
                        setTimeout(addCardRequest, 100)
                    }
                }}
            />}

        <Row style={[jEnd, mt2]} visible={editor === editorState.addCard}>
            <StatusMessage statusMessage={state.statusMessage}/>
            <BtnPrimary
                title={'добавить'}
                onPress={addCardRequest}
            />
        </Row>
    </Flex>
}

function StatusMessage({statusMessage}) {
    const maxCounter = 40
    const [state, setState] = useState({message: '', counter: 0})

    useEffect(() => {
        let isMounted = true
        if (statusMessage !== state.message) {
            if (isMounted) setState({message: statusMessage, counter: maxCounter})
        } else if (state.counter) {
            setTimeout(() => {
                const counter = state.counter - 1
                if (isMounted) setState({...state, counter})
            }, 100)
        }
        return () => {
            isMounted = false
        }
    }, [statusMessage, state])
    return <TextMain style={[primary, mr1, {opacity: state.counter / maxCounter}]}>{state.message}</TextMain>
}















