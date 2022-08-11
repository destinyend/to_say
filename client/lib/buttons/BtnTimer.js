import {useEffect, useState} from "react";
import {border} from "../../const";
import BtnSecondary from "./BtnSecondary";

export function BtnTimer({
                            width: minWidth,
                             start,
                             endMessage,
                             onPress
                         }) {
    const [counter, setCounter] = useState(start)
    useEffect(() => {
        if (!counter) return
        let timer = setTimeout(() => setCounter(counter - 1), 1000)
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [counter])
    if (counter) return <BtnSecondary
        title={counter}
        disabled={true}
        wrpStyle={wrpStyle}
        textStyle={textStyle}
        bgStyle={[border, bgStyle]}
        style={style}
    />
    return <BtnSecondary
        title={endMessage}
        wrpStyle={wrpStyle}
        textStyle={textStyle}
        bgStyle={[border, bgStyle]}
        onPress={() => {
            onPress()
            setCounter(start)
        }}
        style={style}
    />
}
