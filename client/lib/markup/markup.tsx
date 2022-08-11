import {TouchableOpacity, View} from "react-native";
import {
    borderTable,
    flex1,
    flex2,
    flex3,
    flex4,
    flex5,
    flex6,
    fRow,
    fWrap
} from "../../const";

export function Row({children=null, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[fRow, fWrap, style]}>{children}</View>
}

export function Flex({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex1, style]}>{children}</View>
}

export function FlexRow({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex1, fRow, style]}>{children}</View>
}

export function Flex1({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex1, style]}>{children}</View>
}

export function Flex2({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex2, style]}>{children}</View>
}

export function Flex3({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex3, style]}>{children}</View>
}

export function Flex4({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex4, style]}>{children}</View>
}

export function Flex5({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex5, style]}>{children}</View>
}

export function Flex6({children, style = {}, visible = true}) {
    if (!visible) return null
    return <View style={[flex6, style]}>{children}</View>
}

export function PressRow({
                             disabled = false,
                             children,
                             style = {},
                             visible = true,
                             onPress = null,
                         }) {
    if (!visible) return null
    if (disabled) return <View style={[fRow, style]}>{children}</View>
    return <TouchableOpacity style={[fRow, style]} onPress={onPress}>{children}</TouchableOpacity>
}

export function BorderView({style, visible = true, children}) {
    if (!visible) return null
    return <View style={[borderTable, style]}>{children}</View>
}

export function BorderFlex({style, visible = true, children}) {
    if (!visible) return null
    return <Flex style={[borderTable, style]}>{children}</Flex>
}

export function BorderFlex2({style, visible = true, children}) {
    if (!visible) return null
    return <Flex2 style={[borderTable, style]}>{children}</Flex2>
}

export function BorderFlex3({style, visible = true, children}) {
    if (!visible) return null
    return <Flex3 style={[borderTable, style]}>{children}</Flex3>
}

export function BorderFlex4({style, visible = true, children}) {
    if (!visible) return null
    return <Flex4 style={[borderTable, style]}>{children}</Flex4>
}

export function BorderFlex5({style, visible = true, children}) {
    if (!visible) return null
    return <Flex5 style={[borderTable, style]}>{children}</Flex5>
}

export function BorderFlex6({style, visible = true, children}) {
    if (!visible) return null
    return <Flex6 style={[borderTable, style]}>{children}</Flex6>
}

export function BorderRow({style, visible = true, children}) {
    if (!visible) return null
    return <Row style={[borderTable, style]}>{children}</Row>
}

export function Col({style = null, visible = true, children = null}) {
    if (!visible) return null
    return <View style={style}>{children}</View>
}

export function PressCol({style, visible = true, children = null, onPress = null}) {
    if (!visible) return null
    return <TouchableOpacity style={style} onPress={onPress}>{children}</TouchableOpacity>
}

export function FlexCol({style, visible = true, children}) {
    if (!visible) return null
    return <Col style={[flex1, style]}>{children}</Col>
}

