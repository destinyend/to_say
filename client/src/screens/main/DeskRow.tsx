import {PressCol, PressRow, Row} from "../../../lib/markup/markup";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {
    black,
    bold,
    danger,
    fCenter,
    fixWidth,
    fontTitle, jCenter,
    lessTablet,
    m0, mr2,
    noWrap,
    p0,
    screenWidth,
    secondary
} from "../../../const";
import {appSlice, teacherState, useAppDispatch} from "../../store/app";
import {desksSlice} from "../../store/desks";
import {AppContext} from "../../../contexts";
import {useContext} from "react";
import TextMain from "../../../lib/text/TextMain";
import FA from "../../../lib/static/FA";
import {Platform, StyleSheet} from "react-native";


export default function ({desk}) {
    const dispatch = useAppDispatch()
    const {navigation} = useContext(AppContext)

    function openEditor() {
        dispatch(desksSlice.actions.setCurrentDesk(desk.id))
        dispatch(appSlice.actions.editDesk())
    }

    function learning() {
        dispatch(desksSlice.actions.setCurrentDesk(desk.id))
        dispatch(appSlice.actions.setTeacherState(teacherState.initial))
        navigation.navigate('Learning')
    }

    const cardsToStudy = desk.cards_in_desk - desk.cards_studied

    return <Row style={[lessTablet() ? fixWidth(screenWidth.width-10) : null, noWrap]}>
        <PressCol
            style={[jCenter, Platform.OS === 'android' ? mr2: null]}
            onPress={openEditor}
        >
            <FA icon={faEdit}/>
        </PressCol>
        <PressRow style={[fCenter]} onPress={learning}>
            <TextMain
                style={StyleSheet.flatten([fixWidth(65), cardsToStudy ? danger : null, p0, m0])}>
                {cardsToStudy}/{desk.cards_in_desk}
            </TextMain>
            <TextMain
                style={[
                    desk.is_learning ? null : secondary,
                    bold,
                    lessTablet() ? null: fontTitle,
                    black
                ]}
            >
                {desk.name}
            </TextMain>
        </PressRow>
    </Row>
}
