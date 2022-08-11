import React from "react";
import {
    fCenter,
    fontMain as fontBig, heightNormal,
    lessDesktop,
    primary,
    secondary
} from "../../const";
import {faToggleOff, faToggleOn} from "@fortawesome/free-solid-svg-icons";
import {Text, StyleSheet, Platform} from "react-native";
import {Flex, PressRow} from "../markup/markup";
import FA from "../static/FA";

interface ToggleInterface {
    selected?: boolean,
    onPress?: (boolean) => void,
    visible?: boolean,
    style?: object,
    text?: string
}

export default function ({
                             selected = false,
                             onPress = null,
                             visible = true,
                             style = null,
                             text = ''
                         }: ToggleInterface) {
    if (!visible) return null
    let fontMultiple = 1.5
    if (lessDesktop()) fontMultiple = Platform.OS === 'web' ? 1: 2
    return <PressRow
        style={StyleSheet.flatten([fCenter, fCenter, heightNormal, style])}
        onPress={onPress}
    >
        <FA
            icon={selected ? faToggleOn : faToggleOff}
            // @ts-ignore
            style={[{color: selected ? primary.color : secondary.color, fontSize: fontBig.fontSize * fontMultiple}, style]}
            size={fontBig.fontSize}
        />
        <Text> {text}</Text>
    </PressRow>
}
