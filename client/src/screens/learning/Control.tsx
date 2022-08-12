import {faEdit, faVolumeHigh, faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Row} from "../../../lib/markup/markup";
import {fixWidth, jBetween, ml1, mr1} from "../../../const";
import TextMain from "../../../lib/text/TextMain";
import Select from "../../../lib/fields/Select";
import {appSlice, teacherState, useAppDispatch, useAppSelector} from "../../store/app";
import {learningModes, userSlice} from "../../store/user";
import Btn from "../../../lib/buttons/Btn";
import {desksSlice} from "../../store/desks";


export default function () {
    const user = useAppSelector(state => state.user.data)
    const {data: desks, currentDeskId} = useAppSelector(state => state.desks)
    const {cardsToStudyInitial, cardsToStudyCurrent} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    function formatValue(value) {
        if (value === -1) return null
        else if (value === null) return -1
        return value
    }

    function editCard() {
        dispatch(appSlice.actions.editCard())
    }

    function saveUser(key, value) {
        if (user[key] === value) return
        if (key === 'current_desk') {
            dispatch(desksSlice.actions.setCurrentDesk(value))
            dispatch(appSlice.actions.setTeacherState(teacherState.initial))
        } else dispatch(userSlice.actions.patch({id: user.id, [key]: value}))
    }

    let items = desks.map((desk) => {
        return {label: desk.name, value: desk.id}
    })

    // items.unshift({label: 'учить всё', value: -1}) доработать
    return <Row style={jBetween}>
        <Row>
            <TextMain>{cardsToStudyCurrent}/{cardsToStudyInitial}</TextMain>
            <Select
                value={currentDeskId}
                onChange={value => saveUser('current_desk', formatValue(+value))}
                items={items}
                style={ml1}
            />
            <Select
                style={[ml1, fixWidth(80)]}
                value={user.learning_mode}
                onChange={value => saveUser('learning_mode', value)}
                items={[
                    {label: 'RU > EN', value: learningModes.ru_to_en},
                    {label: 'EN > RU', value: learningModes.en_to_ru},
                    {label: 'EN + RU', value: learningModes.en_and_ru},
                ]}
            />
        </Row>

        <Row>
            <Btn
                title={user.sound_on ? faVolumeHigh : faVolumeMute}
                style={mr1}
                onPress={() => saveUser('sound_on', !user.sound_on)}
            />
            <Btn
                visible={true}
                title={faEdit}
                style={mr1}
                onPress={editCard}
            />
        </Row>
    </Row>
}

