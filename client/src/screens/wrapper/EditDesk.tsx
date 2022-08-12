import {useContext, useEffect, useRef, useState} from "react";
import {appSlice, editorState, useAppDispatch, useAppSelector} from "../../store/app";
import {deskAccess, deskCreate, deskDelete, desksSlice, desksStatus, IDesk} from "../../store/desks";
import {AppContext} from "../../../contexts";
import {esc} from "./Alert";
import {Col, Flex, Row} from "../../../lib/markup/markup";
import {
    borderRadius,
    fixHeight,
    flex1,
    flexField,
    jBetween, jCenter,
    jEnd,
    jStart,
    m2,
    mb2,
    mh2,
    mr2,
    mt2,
    mv1,
    p1,
    primary
} from "../../../const";
import Toggle from "../../../lib/fields/Toggle";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import Btn from "../../../lib/buttons/Btn";
import {TextInput} from "react-native";
import BtnPrimary from "../../../lib/buttons/BtnPrimary";
import CardsInDesk from "./CardsInDesk";
import Loading from "../../../lib/static/Loading";
import FadingText from "../../../lib/text/FadingText";
import {H3} from "../../../lib/text/H";
import {cardsSlice} from "../../store/cards";
import TextMain from "../../../lib/text/TextMain";
import BtnSecondary from "../../../lib/buttons/BtnSecondary";
import {navigationSlice} from "../../store/navigation";

export default function () {
    const nameRef = useRef()
    const descriptionRef = useRef()
    const {setAlert, getCurrentDesk, navigation} = useContext(AppContext)
    const {editor} = useAppSelector(state => state.app)
    const {status, isCreating, isDeleting, statusMessage} = useAppSelector(state => state.desks)
    const dispatch = useAppDispatch()
    const {addCard} = appSlice.actions
    if (status !== desksStatus.ready) return <Loading/>
    const user = useAppSelector(state => state.user.data)
    const desk = getCurrentDesk(editor === editorState.foundDesk)
    const [message, setMessage] = useState('')

    const initialState: IDesk =
        [editorState.editDesk, editorState.foundDesk].includes(editor) ? {...desk} :
            {id: null, name: '', description: '', access: deskAccess.private, is_learning: true, owner: user.id}
    const [state, setState] = useState(initialState)

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            setMessage(statusMessage)
        }
    }, [status, isDeleting, isCreating])

    const editable = (editor === editorState.addDesk) || (Boolean(desk && desk.owner === user.id))

    function requestDeleteDesk() {
        setAlert({
            title: 'Удалить колоду?',
            buttons: [
                {
                    title: 'удалить',
                    primary: true,
                    onPress: () => {
                        dispatch(deskDelete(desk.id))
                        dispatch(appSlice.actions.editorClose())
                        dispatch(cardsSlice.actions.deleteCardsOnClient(desk.id))
                    }
                },
                esc
            ]
        })
    }

    function updateState(args) {
        setState({...state, ...args})
    }

    function patchDesk(key, value) {
        if (editor === editorState.addDesk || desk[key] === value || (key === 'name' && !value)) return
        if (key === 'is_learning') dispatch(desksSlice.actions.setIsLearning({id: desk.id, is_learning: value}))
        else dispatch(desksSlice.actions.patch({id: desk.id, [key]: value}))
    }

    function setEditorModeAddCard() {
        dispatch(addCard())
    }

    async function addDesk() {
        if (!state.name) {
            setMessage('введите название колоды')
            return
        }
        delete state.id
        dispatch(deskCreate(state))
        updateState(initialState)
    }

    function study() {
        if (!desk.is_learning) dispatch(desksSlice.actions.setIsLearning({id: desk.id, is_learning: true}))
        dispatch(appSlice.actions.editorClose())
        navigation.navigate('Learning')
    }

    if (isDeleting) return <H3>удаление...</H3>
    if (isCreating) return <H3>добавление...</H3>
    return <Flex style={m2}>
        <Row style={[mb2, jBetween]}>
            <Row>
                <Toggle
                    selected={state.is_learning}
                    text={'учить'}
                    onPress={() => {
                        const is_learning = !state.is_learning
                        updateState({is_learning})
                        patchDesk('is_learning', is_learning)
                    }}
                />
                <Toggle
                    style={mh2}
                    visible={editor === editorState.addDesk || editable}
                    selected={state.access === deskAccess.public}
                    text={'публичная'}
                    onPress={() => {
                        const value = state.access === deskAccess.private ? deskAccess.public : deskAccess.private
                        updateState({access: value})
                        patchDesk('access', value)
                    }}
                />

            </Row>
            <Row style={jCenter}>
                <TextMain
                    visible={editable && [editorState.editDesk, editorState.foundDesk].includes(editor)}
                    style={primary}
                >
                    вы владелец
                </TextMain>
                <TextMain style={primary} visible={!editable}>редактирование запрещено</TextMain>
                <Btn
                    visible={editable && [editorState.editDesk, editorState.foundDesk].includes(editor)}
                    title={faTrash}
                    onPress={requestDeleteDesk}
                />
            </Row>
        </Row>
        <TextInput
            autoFocus={true}
            editable={editable}
            placeholder={'название'}
            style={[flexField, mb2, {borderColor: 'transparent'}]}
            value={state.name}
            onChangeText={name => updateState({name})}
            onBlur={() => patchDesk('name', state.name)}
            ref={nameRef}
        />
        <Col style={[fixHeight(40), mb2]}>
            <TextInput
                editable={editable}
                ref={descriptionRef}
                placeholder={'описание'}
                value={state.description}
                // @ts-ignore
                style={[flex1, {backgroundColor: '#eeeeee'}, p1, borderRadius, jStart]}
                numberOfLines={5}
                onChangeText={description => updateState({description})}
                onBlur={() => patchDesk('description', state.description)}
            />
        </Col>
        <Row style={[mv1, jBetween]}>
            <BtnPrimary
                title={'учить!'}
                style={mv1}
                onPress={study}
            />
            <BtnSecondary
                visible={editor === editorState.editDesk && editable}
                title={'добавить карточку'}
                style={mv1}
                onPress={setEditorModeAddCard}
            />
        </Row>

        {[editorState.editDesk, editorState.foundDesk].includes(editor) ? <CardsInDesk/> : null}
        <Row style={[jEnd, mt2]}>
            <FadingText text={message} style={mr2}/>
            <BtnPrimary
                visible={editor === editorState.addDesk}
                title={'добавить'}
                onPress={addDesk}
            />
        </Row>
    </Flex>
}


