import React, {useContext} from "react";
import {Platform, View} from "react-native";
import {AppContext} from "../../../contexts";
import {bgWhite, border, fCenter, fixWidth, jCenter, mt3, mv2, shadow} from "../../../const";
import {Flex} from "../../../lib/markup/markup";
import {H3} from "../../../lib/text/H";
import {teacherState, useAppSelector} from "../../store/app";
import {randInt} from "../../../lib/sugar";
import {learningModes} from "../../store/user";
import TextMain from "../../../lib/text/TextMain";
import {MEDIA_PATH} from "../../store/cards";
import Audio from "../../../lib/static/Audio";
import Loading from "../../../lib/static/Loading";

export default function () {
    const {teacher} = useAppSelector(state => state.app)
    const user = useAppSelector(state => state.user.data)
    const {getCurrentCard} = useContext(AppContext)
    if (teacher === teacherState.done) return <Flex style={[fCenter, jCenter]}>
        <H3 children={'нет карточек для обучения'}/>
    </Flex>

    if (![teacherState.answer, teacherState.question].includes(teacher)) return <Loading/>

    const card = getCurrentCard()
    if (!card) return <Flex>
    </Flex>

    function reverseCard(): boolean {
        switch (user.learning_mode) {
            case learningModes.ru_to_en:
                return true;
            case learningModes.en_and_ru:
                return Boolean(randInt(0, 1));
            default:
                return false;
        }
    }

    const cardReverse = reverseCard()

    let side_one = cardReverse ? card.side_two : card.side_one
    let side_two = cardReverse ? card.side_one : card.side_two

    const android = Platform.OS === 'android' ? {...bgWhite, ...border}: null

    return <Flex>

        <Flex style={[shadow, mv2]}>
            <Flex style={[jCenter, fCenter, android]}>
                <TextMain>{side_one}</TextMain>
                <View style={[fixWidth(300), mt3]}>
                    <Audio
                        visible={Boolean(card.media)}
                        url={MEDIA_PATH + card.media}
                        autoPlay={user.sound_on}
                    />
                </View>
            </Flex>
        </Flex>
        <Flex style={[jCenter, fCenter, shadow, mv2, android]}>
            <TextMain visible={teacher === teacherState.answer}>{side_two}</TextMain>
        </Flex>
    </Flex>
}


