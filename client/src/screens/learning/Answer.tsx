import {View} from "react-native";
import {appSlice, teacherState, useAppDispatch, useAppSelector} from "../../store/app";
import {EDate} from "../../../lib/sugar";
import {Flex, Row} from "../../../lib/markup/markup";
import {bgDanger, fixHeight, fixWidth, flex1, jBetween, jEnd, ml2, mv1, secondary} from "../../../const";
import BtnSecondary from "../../../lib/buttons/BtnSecondary";
import BtnPrimary from "../../../lib/buttons/BtnPrimary";
import {cardsSlice, createLearningProgress} from "../../store/cards";
import TextMain from "../../../lib/text/TextMain";
import Slider from "@react-native-community/slider";
import React, {useState} from "react";
import {userSlice} from "../../store/user";


export default function ({card}) {
    const user = useAppSelector(state => state.user.data)
    const {teacher} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()
    const [learningSpeed, setLearningSpeed] = useState(user.learning_speed)
    if (![teacherState.answer, teacherState.question].includes(teacher)) return null

    let days = {
        again: 'снова',
        today: 'через Nч.',
        tomorrow: 'завтра',
        next_tomorrow: 'послезавтра',
        in_days: 'через Nдн.',
    }

    function saveResult(next_show_in, step) {
        if (card.lp_id) {
            dispatch(cardsSlice.actions.saveLearningProgress({next_show_in, step, id: card.lp_id}))
        } else dispatch(createLearningProgress({card_id: card.id, next_show_in, step}))
        if (step) dispatch(appSlice.actions.dropFromLearningPool(card.id))
        else dispatch(appSlice.actions.moveToEndLearningPool(card.id))
    }

    function showAnswer() {
        dispatch(appSlice.actions.setTeacherState(teacherState.answer))
    }

    function calc(result: number): { step: number, date: string, title: string } {
        if (!result) return {step: 0, date: null, title: 'снова'}
        let step = 0
        if (result === 1) step = card.step + 1
        else if (result === 2) step = card.step + 2
        let interval = step * user.learning_speed * 2

        let date = new EDate();
        date.change({seconds: 10, hours: interval});

        let tomorrow = new EDate()
        tomorrow.change({days: 1})
        tomorrow.setHours(0, 0, 0, 0)
        let next_tomorrow = new EDate()
        next_tomorrow.change({days: 2})
        next_tomorrow.setHours(0, 0, 0, 0)
        let next_next_tomorrow = new EDate()
        next_next_tomorrow.change({days: 3})
        next_next_tomorrow.setHours(0, 0, 0, 0)
        let now = new EDate()
        let title = ''
        if (!result) title = days.again
        else if (date < tomorrow) {
            title = days.today.replace('N', String(date.getHours() - now.getHours()))
        } else if (date < next_tomorrow) title = days.tomorrow
        else if (date < next_next_tomorrow) title = days.next_tomorrow
        else title = days.in_days.replace('N',
                String(Math.round((date.getTime() - new Date().getTime()) / 86400000)))
        return {title, date: date.isoDatetime(), step}
    }

    function saveLearningSpeed() {
        dispatch(userSlice.actions.patch({id: user.id, learning_speed: learningSpeed}))
    }

    return <Row style={[fixHeight(70)]}>
        {teacher === teacherState.answer ?
            <Flex>
                <Row style={[fixWidth(300), mv1]}>
                    <TextMain>период повтора:</TextMain>
                    <Slider
                        thumbTintColor={secondary.color}
                        style={flex1}
                        minimumValue={1}
                        step={1}
                        maximumValue={10}
                        minimumTrackTintColor="#aaa"
                        maximumTrackTintColor="#FFF"
                        value={learningSpeed}
                        onValueChange={setLearningSpeed}
                        onSlidingComplete={saveLearningSpeed}
                    />
                    <TextMain>{Math.round(learningSpeed)}</TextMain>
                </Row>
                <Row style={jBetween}>
                    {[0, 1, 2].map(n => {
                        const {title, date, step} = calc(n)
                        let props = {
                            key: n,
                            style: n ? [flex1, ml2] : flex1,
                            title,
                            onPress: () => saveResult(date, step)
                        }
                        return <BtnSecondary {...props}/>
                    })}
                </Row>
            </Flex>
            :
            <BtnPrimary
                style={flex1}
                title={'посмотреть ответ'}
                onPress={showAnswer}
            />
        }
    </Row>
}
