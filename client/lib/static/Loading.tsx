import {ActivityIndicator, View} from "react-native";
import {flex1, fRow, jCenter, p2, primary} from "../../const";


export default function () {
    // @ts-ignore
    return <View style={[flex1, fRow, p2, jCenter]}>
        <ActivityIndicator size="large" color={primary.color}/>
    </View>
}
