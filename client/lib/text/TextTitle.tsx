import {Text, StyleSheet} from 'react-native'
import {fontTitle, noWrap, p1} from "../../const";

export default function ({
                             visible = true,
                             children = null,
                             numberOfLines = null,
                             style = null
                         }) {
    if (!visible) return null
    return <Text
        style={StyleSheet.flatten([p1, fontTitle, noWrap, style])}
        numberOfLines={numberOfLines}
    >
        {children}
    </Text>
}
