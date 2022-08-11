import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {baseUrl, DELETE, GET, PATCH, POST} from "./axios";
import {IDeskCreate} from "./desks";


export interface ILearningProgress {
    id: number
    step: number
    next_show_in: string
}

export interface ILearningProgressCreate {
    card_id: number
    step: number
    next_show_in: string
}

export interface ILearningProgressCreated {
    card_id: number
    learningProgress: ILearningProgress
}

export interface ICard {
    id: number
    side_one: string
    side_two: string
    media?: string
    desk: number
    lp_id: number // LearningProgress
    next_show_in: string
    step: number
}

export interface ICardPatch {
    id: number
    side_one?: string
    side_two?: string
    media?: string
    desk?: number
}

export interface ICardCreate {
    side_one: string
    side_two: string
    media?: string
    desk: number
}

interface ICardState {
    isLoading: boolean
    currentCardId: number
    statusMessage: string
    data: ICard[]
    isCreating: boolean
    isDeleting: boolean
    learningProgressCreating: boolean
}

export const initialCardState: ICardState = {
    isLoading: true,
    currentCardId: null,
    statusMessage: '',
    data: [],
    isCreating: false,
    isDeleting: false,
    learningProgressCreating: false,
}

function payloadCreator() {
    let loadedDesks = []
    return async (ides: number[]) => {
        const deskIdes = []
        for (let id of ides) {
            if (!loadedDesks.includes(id)) deskIdes.push(id)
        }
        if (!deskIdes?.length) return []
        loadedDesks = Array.from(new Set([...loadedDesks, ...deskIdes]))
        const response = await GET<ICard[]>(`cards/load_cards_in_desks/`, {ides: deskIdes.join(',')})
        return response.data
    }
}

export const cardsLoad = createAsyncThunk(
    'cards/loadInDesks',
    payloadCreator()
)

export const cardCreate = createAsyncThunk(
    'cards/create',
    async (args: ICardCreate) => {
        const response = await POST<IDeskCreate>('cards/', args)
        return response.data
    }
)

export const cardDelete = createAsyncThunk(
    'cards/delete',
    async (id: number) => {
        const response = await DELETE(`cards/${id}/`)
        return [id, response.status]
    }
)

export const createLearningProgress = createAsyncThunk(
    'cards/createLearningProgress',
    async (args: ILearningProgressCreate) => {
        const response = await POST<ILearningProgressCreated>('LearningProgresses/', args)
        return {card_id: args.card_id, learningProgress: response.data}
    }
)

export const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialCardState,
    reducers: {
        setCurrentCard: (state, action: PayloadAction<number>) => {
            state.currentCardId = action.payload
        },
        patch: (state, action: PayloadAction<{ id: number }>) => {
            const id = action.payload.id
            delete action.payload.id
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === id) {
                    PATCH(`cards/${id}/`, action.payload)
                    state.data[i] = {...state.data[i], ...action.payload}
                    break
                }
            }
        },
        deleteCardsOnClient: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(card => card.desk !== action.payload)
        },

        saveLearningProgress: (state, action: PayloadAction<ILearningProgress>) => {
            const id = action.payload.id
            delete action.payload.id
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].lp_id === id) {
                    if (state.data[i].next_show_in === action.payload.next_show_in &&
                        state.data[i].step === action.payload.step) return
                    state.data[i].next_show_in = action.payload.next_show_in
                    state.data[i].step = action.payload.step
                    break
                }
            }
            PATCH(`LearningProgresses/${id}/`, action.payload)
        }
    },
    extraReducers: {
        [cardsLoad.pending.type]: (state) => {
            state.isLoading = true
        },
        [cardsLoad.rejected.type]: (state) => {
            state.isLoading = false
        },
        [cardsLoad.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
            state.isLoading = false
            state.data = state.data.concat(action.payload)
            state.data.sort((a, b) => a.side_one > b.side_one ? 1 : -1)
        },

        [cardCreate.pending.type]: (state) => {
            state.isCreating = true
        },
        [cardCreate.rejected.type]: (state, action: PayloadAction<string>) => {
            state.statusMessage = action.payload
            state.isCreating = false
        },
        [cardCreate.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
            state.data.push(action.payload)
            state.data.sort((a, b) => a.side_one > b.side_one ? 1 : -1)
            state.isCreating = false
            state.statusMessage = 'карта добавлена'
        },

        [cardDelete.pending.type]: (state) => {
            state.isDeleting = true
        },
        [cardDelete.rejected.type]: (state, action: PayloadAction<string>) => {
            state.statusMessage = action.payload
            state.isDeleting = false
        },
        [cardDelete.fulfilled.type]: (state, action: PayloadAction<[id: number, status: number]>) => {
            const [id, status] = action.payload
            if (status !== 204) state.statusMessage = status + ' ошибка удаления'
            else {
                for (let i = 0; i < state.data.length; i++) {
                    if (state.data[i].id === id) {
                        state.data.splice(i, 1)
                        break
                    }
                }
            }
            state.isDeleting = false
        },
        [createLearningProgress.pending.type]: (state) => {
            state.learningProgressCreating = true
        },
        [createLearningProgress.fulfilled.type]: (state, action: PayloadAction<ILearningProgressCreated>) => {
            const {card_id, learningProgress} = action.payload
            state.learningProgressCreating = false
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === card_id) {
                    state.data[i].lp_id = learningProgress.id
                    state.data[i].step = learningProgress.step
                    state.data[i].next_show_in = learningProgress.next_show_in
                    break
                }
            }
        }
    }
})

export const MEDIA_PATH = baseUrl + 'media/cards/'
