import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {AuthStatus, initialUserState, userSlice} from "./user";
import {desksSlice, initialDesksState} from "./desks";
import {appSlice} from "./app";
import {storage} from "../../lib/storage";
import {cardsSlice, initialCardState} from "./cards";
import {translatorSlice} from "./translator";
import {initialNavigationState, navigationSlice} from "./navigation";


const appReducer = combineReducers({
    user: userSlice.reducer,
    desks: desksSlice.reducer,
    app: appSlice.reducer,
    cards: cardsSlice.reducer,
    translator: translatorSlice.reducer,
    navigation: navigationSlice.reducer
})

const rootReducer = (state, action) => {
    if (action.type === 'logout') {
        storage.clear()
        const newState = {
            ...state,
            desks: initialDesksState,
            cards: initialCardState,
            user: {...initialUserState, authStatus: AuthStatus.unauthorized},
            navigation: initialNavigationState
        }
        return appReducer(newState, action)
    }
    return appReducer(state, action)
}

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']



