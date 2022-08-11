import Btn from "./Btn";
import {
    bgSecondary, bgSecondaryLight,
    border,
    white
} from "../../const";

interface BtnInterface {
    title: string | object,

    onPress?(): void,

    onLongPress?(): void,

    disabled?: boolean,
    visible?: boolean,
    style?: any,
    textStyle?: object,
    bgColors?: []
}

export default function ({
                             title = 'props.title',
                             onPress,
                             onLongPress,
                             disabled = false,
                             visible = true,
                             style = null,
                             bgColors = null
                         }: BtnInterface) {
    return <Btn
        title={title}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[white, border, style]}
        bgColors={bgColors ?
            bgColors : [bgSecondaryLight.backgroundColor, bgSecondary.backgroundColor, bgSecondaryLight.backgroundColor]}
        visible={visible}
        disabled={disabled}
    />
}

