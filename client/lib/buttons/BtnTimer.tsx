import {useEffect, useState} from "react";
import BtnSecondary from "./BtnSecondary";

export function BtnTimer({
                             visible = true,
                             style = null,
                             startSeconds = 60,
                             endMessage = 'props.endMessage',
                             onPress = null,
                             reset = false
                         }) {
    if (!visible) return null
    const [counter, setCounter] = useState(startSeconds)

    useEffect(() => {
        let isMounted = true
        let timer
        if (!timer) timer = setInterval(() => {
            if (counter && isMounted) setCounter(counter - 1)
            else clearInterval(counter)
        }, 1000)
        return () => {
            isMounted = false
            clearInterval(timer)
        }
    }, [reset, counter])

    if (counter) return <BtnSecondary
        title={String(counter)}
        disabled={true}
        style={style}
    />
    return <BtnSecondary
        title={endMessage}
        style={style}
        onPress={onPress}
    />
}
