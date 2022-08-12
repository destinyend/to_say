import {ScrollView} from "react-native"
import {Flex, PressCol, Row} from "../../../lib/markup/markup";
import Loading from "../../../lib/static/Loading";
import TextMain from "../../../lib/text/TextMain";
import DeskRow from "./DeskRow";
import {appSlice, useAppDispatch, useAppSelector} from "../../store/app";
import {useEffect} from "react";
import {desksLoad, desksSlice, desksStatus, findDesks} from "../../store/desks";
import Find from "../../../lib/fields/Find";
import {bold, fStart, mb2, mv0, p1, pv0, secondary} from "../../../const";
import TextTitle from "../../../lib/text/TextTitle";


export default function () {
    const {status, data: desks, foundDesks, finding} = useAppSelector(state => state.desks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === desksStatus.initial) {
            dispatch(desksLoad())
        }
    }, [])


    if (status !== desksStatus.ready) return <Loading/>
    function find(text: string): void {
        dispatch(findDesks(text))
    }

    function showDesk(deskId: number): void {
        dispatch(desksSlice.actions.setCurrentDesk(deskId))
        dispatch(appSlice.actions.showFoundDesk(deskId))
    }

    if (finding) {
        return <Flex>
            <TextMain>ищу...</TextMain>
            <Loading/>
        </Flex>
    }

    return <Flex>
        <Find style={mb2} placeholder={'поиск...'} onPress={find}/>
        <ScrollView>
            <TextMain visible={!desks.length}>"добавить" - создать свою колоду</TextMain>
            <TextMain visible={!desks.length}>"поиск" - выбрать из существующих</TextMain>
            {foundDesks.map((desk, key) => {
                return <PressCol
                    style={[p1, fStart]}
                    key={key}
                    onPress={() => showDesk(desk.id)}
                >
                    <TextTitle style={[mv0, pv0, desk.is_learning ? null : secondary]}>{desk.name}</TextTitle>
                    <Row>
                        <TextMain style={[mv0, pv0, bold]}>карт: {desk.cards_in_desk}</TextMain>
                        <TextMain style={[mv0, pv0]}>{desk.description}</TextMain>
                    </Row>

                </PressCol>
            })}
            {desks.map((desk, key) => <DeskRow desk={desk} key={key}/>)}
        </ScrollView>
    </Flex>
}
