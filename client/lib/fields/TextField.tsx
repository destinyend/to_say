import React from "react";
import {TextInput} from "react-native";
import {field} from "../../const";

interface TextInputInterface {
    visible?: boolean,
    value?: string,
    onChange?: (string) => void,
    onBlur?: (string) => void,
    onKey?: object,
    style?: object,
    placeholder?: string,
    disabled?: boolean
    keyBoardType?: 'numeric'| null
}

export default function ({
                             visible = true,
                             value = '',
                             onChange = null,
                             onBlur = null,
                             onKey = null,
                             style = null,
                             placeholder = '',
                             disabled = false,
                             keyBoardType=null
                         }: TextInputInterface) {
    if (!visible) return null
    return <TextInput
        editable={!disabled}
        onKeyPress={({nativeEvent: {key: keyValue}}) => {
            if (onKey && onKey[keyValue]) onKey[keyValue](value)
        }}
        style={[field, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        keyboardType={keyBoardType}
    />
}
