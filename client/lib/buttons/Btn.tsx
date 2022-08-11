import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import FA from "../static/FA";
import {
    btnStyle, fCenter,
    flex1,
    fontMain, isDesktop,
    jCenter,
    noWrap,
    ph1
} from "../../const";


interface BtnInterface {
    title: string | object,

    onPress?(): void,

    onLongPress?(): void,

    disabled?: boolean,
    visible?: boolean,
    style?: any,
    bgColors?: string[]
}


export default function ({
                             title = 'props.title',
                             onPress,
                             onLongPress,
                             disabled = false,
                             visible = true,
                             bgColors = ['transparent', 'transparent'],
                             style = null
                         }: BtnInterface) {
    if (!visible) return null
    style = StyleSheet.flatten(style)
    let textStyle = StyleSheet.flatten([fontMain, noWrap])
    let wrpStyle = StyleSheet.flatten([btnStyle, {marginRight: 0}])
    let gradientStyle = StyleSheet.flatten([flex1, jCenter, fCenter, ph1])
    for (let key in style) {
        if (['fontSize', 'fontWeight', 'color', 'fontStyle'].includes(key)) textStyle[key] = style[key]
        else if (['margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginVertical',
            'marginHorizontal', 'minWidth', 'width', 'maxWidth', 'flex'].includes(key)) wrpStyle[key] = style[key]
        else if (['borderBottomRightRadius', 'borderTopRightRadius', 'borderTopLeftRadius',
            'borderBottomLeftRadius', 'borderRadius', 'borderTopColor', 'borderLeftColor', 'borderRightColor',
            'borderBottomColor', 'borderColor'].includes(key)) gradientStyle[key] = style[key]
    }
    if (wrpStyle['flex']) {
        delete wrpStyle['minWidth']
        delete wrpStyle['width']
        delete wrpStyle['maxWidth']
    }

    return <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={wrpStyle}
        onLongPress={onLongPress}
    >
        <LinearGradient
            colors={bgColors}
            // @ts-ignore
            style={gradientStyle}
        >
            {getTitle(title, textStyle)}
        </LinearGradient>
    </TouchableOpacity>

}

function getTitle(title, textStyle) {
    if (['string', 'number'].includes(typeof title)) return <Text style={textStyle}>{title}</Text>
    if (title instanceof Array) {
        return isDesktop() ?
            <Text style={textStyle}>{title[0]}</Text>
            :
            // @ts-ignore
            <FA icon={title[1]} style={textStyle}/>
    }
    // @ts-ignore
    return <FA icon={title} style={textStyle}/>
}
