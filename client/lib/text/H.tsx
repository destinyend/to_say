import {Text} from "react-native";
import {bold, jCenter, fontTitle, fontMain, italic, primary, m1} from "../../const";
import React from "react";

export function H1({style=null, children=null, visible=true}) {
    if (!visible) return null
    return <Text style={[jCenter, fontTitle, primary, bold, m1, {backgroundColor: 'transparent'}, style]}>
        {children}
    </Text>
}

export function H2({style, children, visible=true}) {
    if (!visible) return null
    return <Text style={[jCenter, fontMain, primary, bold, m1, {backgroundColor: 'transparent'}, style]}>
        {children}
    </Text>
}

export function H3({style=null, children, visible=true}) {
    if (!visible) return null
    return <Text style={[jCenter, fontMain, primary, m1, {backgroundColor: 'transparent'}, style]}>
        {children}
    </Text>
}

export function H4({style, children, visible=true}) {
    if (!visible) return null
    return <Text style={[jCenter, fontMain, primary, italic, m1, {backgroundColor: 'transparent'}, style]}>
        {children}
    </Text>
}
