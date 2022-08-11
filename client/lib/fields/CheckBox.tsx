import {Text} from "react-native";
import {faSquare} from "@fortawesome/free-solid-svg-icons/faSquare";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {fCenter, primary, secondary} from "../../const";
import FA from "../static/FA";
import {PressRow} from "../markup/markup";
import React from "react";

interface CheckBoxInterface {
    visible?: boolean,
    style?: object | null,
    selected?: boolean,
    onPress?: () => void,
    text?: string
}

export default function ({
                             visible = true,
                             style = null,
                             selected = false,
                             onPress = null,
                             text = ''
                         }: CheckBoxInterface) {
    if (!visible) return null

    return <PressRow
        style={[fCenter]}
        onPress={onPress}
    >
        {selected ?
            <FA
                icon={faCheckSquare}
                // @ts-ignore
                style={primary}
            />
            :
            <FA
                icon={faSquare}
                // @ts-ignore
                style={secondary}
            />
        }
        <Text> {text}</Text>
    </PressRow>
}
