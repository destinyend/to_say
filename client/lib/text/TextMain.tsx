import {Text,StyleSheet} from 'react-native'
import {p1} from "../../const";

export default function ({
                             visible = true,
                             children = null,
                             numberOfLines = null,
                             style = null
                         }) {
    if (!visible) return null
    return <Text
        style={StyleSheet.flatten([p1, style])}
        numberOfLines={numberOfLines}
    >
        {children}
    </Text>
}
