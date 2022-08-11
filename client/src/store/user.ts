import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GET, IApiError, PATCH, POST, token} from "./axios";
import {storage} from "../../lib/storage";
import {primary, success} from "../../const";
import {isEmailCorrect} from "../../lib/sugar";


export enum learningModes {
    ru_to_en = 'ru>en',
    en_to_ru = 'en>ru',
    en_and_ru = 'en+ru'
}

export interface IUser {
    id: number
    username: string
    auto_translate: boolean
    auto_sound: boolean
    learning_speed: number
    learning_mode: learningModes
    sound_on: boolean
    current_desk: number
}

export interface IUserPatch {
    id: number
    username?: string
    auto_translate?: boolean
    auto_sound?: boolean
    learning_speed?: number
    learning_mod?: learningModes
    sound_on?: boolean
    current_desk?: number
}

export enum AuthStatus {
    initial,
    loading,
    unauthorized,
    codeRequesting,
    codeRequested,
    error,
    authorising,
    authorised
}

export interface IUserMessage {
    text: string
    style: typeof primary
}

export interface IUserState {
    data: IUser
    emailMessage: IUserMessage
    codeMessage: IUserMessage
    code: number
    authStatus: AuthStatus
    canPasswordRequestInSeconds: number
}

export const initialUserState: IUserState = {
    data: null,
    codeMessage: null,
    emailMessage: null,
    code: null,
    authStatus: AuthStatus.initial,
    canPasswordRequestInSeconds: 0
}


export const userSelf = createAsyncThunk(
    'user/self',
    async () => {
        const response = await GET<IUser>('users/self/')
        return response.data
    }
)

export const requestPassword = createAsyncThunk(
    'user/requestPassword',
    async (username: string) => {
        if (!isEmailCorrect(username)) throw WRONG_EMAIL
        const response = await POST('users/request_password/', {username}, false)
        return response.data
    }
)

type TUserLogin = {
    username: string
    password: string
}

const WRONG_EMAIL = 'wrongEmail'
const WRONG_CODE = 'wrongCode'

export const userLogin = createAsyncThunk(
    'user/login',
    async (args: TUserLogin) => {
        if (!isEmailCorrect(args.username)) throw WRONG_EMAIL
        if (args.password.length !== CODE_LENGTH || isNaN(+args.password)) throw WRONG_CODE
        const response = await POST('token_obtain/', args, false)
        if (response.status === 200) {
            await storage.set(token.refresh, response.data.refresh, false)
            await storage.set(token.access, response.data.access, false)
            return '200'
        }
        throw '401'
    }
)

const CODE_LENGTH = 6

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        patch: (state, action: PayloadAction<IUserPatch>) => {
            const id = action.payload.id
            delete action.payload.id
            PATCH(`users/${id}/`, action.payload)
            state.data = {...state.data, ...action.payload}
        }
    },
    extraReducers: {
        [userSelf.pending.type]: (state) => {
            state.authStatus = AuthStatus.loading
        },
        [userSelf.rejected.type]: (state, action: IApiError) => {
            if (action.error.message === '401') {
                state.authStatus = AuthStatus.unauthorized
            } else {
                state.authStatus = AuthStatus.error
            }

        },
        [userSelf.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            if (action.payload) {
                state.authStatus = AuthStatus.authorised
                state.data = action.payload
            } else {

                state.authStatus = AuthStatus.unauthorized
                state.data = null
            }
        },

        [requestPassword.pending.type]: (state) => {
            state.authStatus = AuthStatus.codeRequesting
            state.codeMessage = null
            state.emailMessage = null
        },
        [requestPassword.rejected.type]: (state, action: IApiError) => {
            if (action.error.message === WRONG_EMAIL) {
                state.emailMessage = {text: 'неверный email', style: primary}
            }
            state.authStatus = AuthStatus.unauthorized
        },
        [requestPassword.fulfilled.type]: (state, action: PayloadAction) => {
            state.authStatus = AuthStatus.codeRequested
            state.canPasswordRequestInSeconds = action.payload['seconds']
            state.emailMessage = {text: 'проверьте Ваш email', style: success}
        },

        [userLogin.pending.type]: (state) => {
            state.authStatus = AuthStatus.authorising
            state.codeMessage = null
            state.emailMessage = null
        },
        [userLogin.rejected.type]: (state, action: IApiError) => {
            state.authStatus = AuthStatus.codeRequested
            switch (action.error.message) {
                case WRONG_CODE:
                    state.codeMessage = {text: 'неверный код авторизации', style: primary}
                    break
                case WRONG_EMAIL:
                    state.emailMessage = {text: 'неверный email', style: primary}
                    break
                case '401':
                    state.codeMessage = {text: 'неверный email или код', style: primary}
                    break
                case '403':
                    state.authStatus = AuthStatus.unauthorized
                    state.codeMessage = {text: 'код устарел', style: primary}
                    break
            }
        },
        [userLogin.fulfilled.type]: (state, action: PayloadAction<number>) => {
            state.authStatus = AuthStatus.authorised
        }
    }
})



