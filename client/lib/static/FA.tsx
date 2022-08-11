import {Platform, StyleSheet, Text} from "react-native";
import {FontAwesomeIcon as FontAwesomeReact} from "@fortawesome/react-fontawesome";
import {FontAwesomeIcon as FontAwesomeNative} from "@fortawesome/react-native-fontawesome";
import {fontMain} from "../../const";

export default function ({
                             icon,
                             visible = true,
                             style = {
                                 fontSize: fontMain.fontSize
                             }
                         }) {
    if (!visible) return null
    if (!icon) return <Text>FA {String(icon)}</Text>
    if (Platform.OS === 'web') {
        let webStyle = StyleSheet.flatten(style)
        const fontSize = webStyle?.fontSize || fontMain.fontSize
        // @ts-ignore
        webStyle = {width: fontSize, height: fontSize, color: webStyle?.color}
        return <FontAwesomeReact icon={icon} style={webStyle}/>;
    }
    // @ts-ignore
    return <FontAwesomeNative icon={icon} style={style}/>
}
