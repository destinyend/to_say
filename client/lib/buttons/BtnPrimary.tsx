import Btn from "./Btn";
import {
    bgPrimary,
    bgPrimaryLight,
    border, btnWidth,
    white
} from "../../const";

export interface BtnInterface {
    title: string | object,

    onPress?(): void,

    onLongPress?(): void,

    disabled?: boolean,
    visible?: boolean,
    style?: any,
    textStyle?: object,
    bgColors?: string[]
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
        style={[white, border, {width: btnWidth.maxWidth}, style]}
        bgColors={bgColors ?
            bgColors : [bgPrimaryLight.backgroundColor, bgPrimary.backgroundColor, bgPrimaryLight.backgroundColor]}
        visible={visible}
        disabled={disabled}
    />
}

