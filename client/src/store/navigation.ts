import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface INavigationState {
    current: string,
    stack: string[],
    canGoBack: boolean
}

export const LOGIN_REDIRECT = 'Main'

export const initialNavigationState: INavigationState = {
    current: 'Login',
    stack: [],
    canGoBack: false
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: initialNavigationState,
    reducers: {
        navigate: (state, action: PayloadAction<string>) => {
            if (action.payload === 'Login') state.stack = []
            else if (state.current !== 'Login') state.stack.push(state.current)
            state.canGoBack = state.stack.length > 0
            state.current = action.payload
        },
        goBack: (state) => {
            if (state.stack.length > 0) {
                state.current = state.stack[state.stack.length - 1]
                state.stack.pop()
                state.canGoBack = state.stack.length > 0
            }
        }
    }
})
