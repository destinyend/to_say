import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GET} from "./axios";


export enum translatorStatus {
    initial,
    translating,
    done
}

interface ITranslator {
    status: translatorStatus
    result: string
    statusMessage: string
    lastText: string
}

const initialState: ITranslator = {
    status: translatorStatus.initial,
    result: '',
    statusMessage: '',
    lastText: ''
}

export const translateEnRu = createAsyncThunk(
    'translator',
    async (text: string) => {
        if (!text) return ''
        const response = await GET('translator/en_ru/?text=' + text)
        return response.data
    }
)

export const translatorSlice = createSlice({
    name: 'translator',
    initialState,
    reducers: {},
    extraReducers: {
        [translateEnRu.pending.type]: (state) => {
            state.status = translatorStatus.translating
        },
        [translateEnRu.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = translatorStatus.done
            state.statusMessage = action.payload
        },
        [translateEnRu.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.status = translatorStatus.done
            state.result = action.payload['result'] ? action.payload['result'] : 'ошибка перевода'
            state.statusMessage = ''
        },
    }
})
