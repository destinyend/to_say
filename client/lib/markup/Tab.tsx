import {black, border, flex1, jCenter, p2, primary} from "../../const";
import {TouchableOpacity} from "react-native";
import TextMain from "../text/TextMain";


interface TabInterface {
    active?: boolean,
    onPress?: () => void,
    title?: string,
    style?: object | null
    visible?: boolean
}

export function Tab({active, onPress, title, style, visible = true}: TabInterface) {
    if (!visible) return null
    const activeStyle = {
        borderColor: border.borderColor,
        borderTopLeftRadius: border.borderRadius,
        borderTopRightRadius: border.borderRadius,
        borderWidth: border.borderWidth,
        borderBottomColor: 'transparent',
    }

    const inactiveStyle = {
        borderColor: 'transparent',
        borderWidth: border.borderWidth,
        borderBottomColor: border.borderColor,
    }

    const common = {
        ...p2,
        ...jCenter,
        ...flex1,
        height: 40,
    }
    // @ts-ignore
    return <TouchableOpacity
        style={[active ? activeStyle : inactiveStyle, style]}
        onPress={onPress}
    >
        <TextMain style={[common, active ? primary : black]}>{title}</TextMain>
    </TouchableOpacity>
}
