import React, {useState} from "react";
import {btnWidth, fieldWidth, fixWidth, stickLeft, stickRight} from "../../const";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import TextField from "./TextField";
import {Row} from "../markup/markup";
import BtnPrimary from "../buttons/BtnPrimary";


interface FindInterface {
    placeholder: string,

    onPress?(s: string): void,

    disabled?: boolean,
    visible?: boolean,
    style?: object
}

export default function ({
                             onPress,
                             placeholder = 'поиск',
                             disabled = false,
                             visible = true,
                             style = null
                         }: FindInterface) {
    if (!visible) return null
    const [text, setText] = useState('')

    function find() {
        if (text.length > 0) onPress(text.trim())
        setText('')
    }

    return <Row style={[fieldWidth, style]}>
        <TextField
            disabled={disabled}
            placeholder={placeholder}
            style={[fixWidth(fieldWidth.width - btnWidth.minWidth), stickRight]}
            onChange={setText}
            value={text}
            onKey={{
                Enter: find
            }}
        />
        <BtnPrimary
            disabled={disabled}
            style={[stickLeft, fixWidth(btnWidth.minWidth)]}
            title={faSearch}
            onPress={find}
        />
    </Row>
}
