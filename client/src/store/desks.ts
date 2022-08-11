import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DELETE, GET, PATCH, POST} from "./axios";


export enum deskAccess {
    private = 'private',
    public = 'public'
}

export interface IDesk {
    id: number
    name: string
    description?: string
    access: deskAccess
    is_learning: boolean
    owner: number | null
    cards_in_desk?: number
    cards_studied?: number
}

export interface IDeskPatch {
    id: number
    name?: string
    description?: string
    access?: deskAccess
}

export interface IDeskCreate {
    name: string
    description?: string
    access?: deskAccess
    isLearning?: boolean
    owner?: number
}

export enum desksStatus {
    initial,
    loading,
    ready
}

interface IDeskSlice {
    data: IDesk[]
    status: desksStatus
    statusMessage: string
    currentDeskId: number
    isCreating: boolean
    isDeleting: boolean
    finding: boolean
    foundDesks: IDesk[]
}

export const initialDesksState: IDeskSlice = {
    data: [],
    status: desksStatus.initial,
    currentDeskId: null,
    isCreating: false,
    isDeleting: false,
    statusMessage: '',
    finding: false,
    foundDesks: []
}


export const desksLoad = createAsyncThunk(
    'desks/loadAvailable',
    async () => {
        const response = await GET<IDesk[]>('desks/download_available_desks/')
        return response.data
    }
)

export const deskCreate = createAsyncThunk(
    'desks/create',
    async (args: IDeskCreate) => {
        const response = await POST<IDeskCreate>('desks/', args)
        return response.data
    }
)

export const deskDelete = createAsyncThunk(
    'desks/delete',
    async (id: number) => {
        const response = await DELETE(`desks/${id}/`)
        return [id, response.status]
    }
)

export const findDesks = createAsyncThunk(
    'desks/find',
    async (text: string) => {
        const response = await GET('desks/find/', {text})
        return response.data
    }
)

export const desksSlice = createSlice({
    name: 'desks',
    initialState: initialDesksState,
    reducers: {
        setCurrentDesk: (state, action: PayloadAction<number>) => {
            state.currentDeskId = action.payload
        },
        patch: (state, action: PayloadAction<IDeskPatch>) => {
            const id = action.payload.id
            delete action.payload.id
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === id) {
                    PATCH(`desks/${id}/`, action.payload)
                    state.data[i] = {...state.data[i], ...action.payload}
                    break
                }
            }
        },
        setIsLearning: (state, action: PayloadAction<{ id: number, is_learning: boolean }>) => {
            const {id, is_learning} = action.payload
            PATCH(`desks/${id}/set_is_learning/`, {is_learning})
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === id) {
                    state.data[i].is_learning = is_learning
                    break
                }
            }
        }
    },
    extraReducers: {
        [desksLoad.pending.type]: (state) => {
            Object.assign(state, initialDesksState)
        },
        [desksLoad.rejected.type]: (state, action: PayloadAction<string>) => {
            state.status = desksStatus.ready
            state.statusMessage = action.payload
        },
        [desksLoad.fulfilled.type]: (state, action: PayloadAction<IDesk[]>) => {
            state.status = desksStatus.ready
            state.data = action.payload
            if (action.payload.length) state.currentDeskId = 0
        },

        [deskCreate.pending.type]: (state) => {
            state.isCreating = true
        },
        [deskCreate.rejected.type]: (state, action: PayloadAction<string>) => {
            state.statusMessage = action.payload
            state.isCreating = false
        },
        [deskCreate.fulfilled.type]: (state, action: PayloadAction<IDesk>) => {
            const desk: IDesk = {...action.payload, cards_in_desk: 0, cards_studied: 0}
            state.data.push(desk)
            state.data.sort((a, b) => a.name > b.name ? 1 : -1)
            state.currentDeskId = action.payload.id
            state.isCreating = false
            state.statusMessage = 'колода добавлена'
        },

        [deskDelete.pending.type]: (state) => {
            state.isDeleting = true
        },
        [deskDelete.rejected.type]: (state, action: PayloadAction<string>) => {
            state.statusMessage = action.payload
            state.isDeleting = false
        },
        [deskDelete.fulfilled.type]: (state, action: PayloadAction<[id: number, status: number]>) => {
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

        [findDesks.pending.type]: (state) => {
            state.finding = true
        },
        [findDesks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.finding = false
            state.statusMessage = action.payload
        },
        [findDesks.fulfilled.type]: (state, action: PayloadAction<IDesk[]>) => {
            state.finding = false
            state.foundDesks = action.payload
        }
    }
})













