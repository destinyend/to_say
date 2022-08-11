import {useEffect, useState} from "react";
import TextMain from "./TextMain";
import {mr1, primary} from "../../const";

export default function ({text='', style=null}) {
    const maxCounter = 40
    const initialState = {text:'', counter: maxCounter}
    const [state, setState] = useState(initialState)

    useEffect(() => {
        let isMounted = true
        if (text !== state.text) {
            if (isMounted) setState({text, counter: maxCounter})
        } else if (state.counter) {
            setTimeout(() => {
                const counter = state.counter -1
                if (isMounted) setState({...state, counter})
            }, 100)
        }
        return () => {
            isMounted = false
        }
    }, [text, state])

    return <TextMain style={[primary, mr1, {opacity: state.counter/maxCounter}, style]}>{state.text}</TextMain>
}
