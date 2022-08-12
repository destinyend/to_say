import {ScrollView, View} from "react-native";
import Find from "../../../lib/fields/Find";
import {bold, fStart, mb2, mt2, mv0, p1, pv0, secondary} from "../../../const";
import {appSlice, useAppDispatch, useAppSelector} from "../../store/app";
import {desksSlice, findDesks} from "../../store/desks";
import {Flex, PressCol, Row} from "../../../lib/markup/markup";
import TextTitle from "../../../lib/text/TextTitle";
import TextMain from "../../../lib/text/TextMain";
import Loading from "../../../lib/static/Loading";
import {useEffect} from "react";


export default function () {
    const dispatch = useAppDispatch()
    const {foundDesks, finding} = useAppSelector(state => state.desks)

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
        </ScrollView>
    </Flex>
}
