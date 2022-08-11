import {createContext} from "react";
import {IDesk} from "./src/store/desks";
import {ICard} from "./src/store/cards";


export interface IAlertButton {
    title: string,
    primary?: boolean,
    onPress?: () => void
}

export interface IAlert {
    show?: boolean
    title?: string,
    body?: string,
    buttons?: IAlertButton[]
}

interface IAppContext {
    getCurrentCard: () => ICard
    getCurrentDesk: (useFoundDesks: boolean) => IDesk
    alert: IAlert
    setAlert: (IAlert) => void,
    navigation: {
        navigate: (string) => void
        goBack: () => void
    }
    setAddCardMode: () => void
}

export const initialAlert: IAlert = {
    show: false,
    title: '',
    body: '',
    buttons: null
}

const InitialAppContext: IAppContext = {
    getCurrentCard: null,
    getCurrentDesk: null,
    alert: null,
    setAlert: null,
    navigation: null,
    setAddCardMode: null
}
export const AppContext = createContext(InitialAppContext)
