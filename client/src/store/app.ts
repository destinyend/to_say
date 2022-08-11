import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";


export enum editorState {
    closed,
    addDesk,
    editDesk,
    addCard,
    editCard,
    foundDesk
}

export enum teacherState {
    initial,
    loading,
    fillingPool,
    selectingCard,
    question,
    answer,
    next,
    done
}

export interface IApp {
    editor: editorState
    teacher: teacherState
    cardsToStudyInitial: number
    cardsToStudyCurrent: number
    learningPool: number[]
    learningPoolSize: number
}

const initialAppState: IApp = {
    editor: editorState.closed,
    teacher: teacherState.initial,
    cardsToStudyCurrent: 0,
    cardsToStudyInitial: 0,
    learningPool: [],
    learningPoolSize: 15
}


export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        addDesk: (state) => {
            state.editor = editorState.addDesk
        },
        editDesk: (state) => {
            state.editor = editorState.editDesk
        },
        addCard: (state, action: PayloadAction<number | null>) => {
            state.editor = editorState.addCard
        },
        editCard: (state, action: PayloadAction<number>) => {
            state.editor = editorState.editCard
        },
        editorClose: (state) => {
            state.editor = editorState.closed
            state.teacher = teacherState.loading
        },
        setTeacherState: (state, action: PayloadAction<teacherState>) => {
            if (action.payload === teacherState.initial) {
                state.learningPool = []
                state.cardsToStudyInitial = 0
            }
            state.teacher = action.payload
        },
        fillLearningPool: (state, action: PayloadAction<number[]>) => {
            const cardIes = action.payload
            for (let id of cardIes) {
                if (state.learningPool.length === state.learningPoolSize) break
                if (state.learningPool.includes(id)) continue
                state.learningPool.push(id)
            }
            if (!state.cardsToStudyInitial) state.cardsToStudyInitial = cardIes.length
            state.cardsToStudyCurrent = cardIes.length
            if (!state.learningPool.length) state.teacher = teacherState.done;
            else state.teacher = teacherState.selectingCard
        },
        dropFromLearningPool: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.learningPool.length; i++) {
                if (state.learningPool[i] === action.payload) {
                    state.learningPool.splice(i, 1)
                    state.teacher = teacherState.next
                    break
                }
            }
        },
        moveToEndLearningPool: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.learningPool.length; i++) {
                if (state.learningPool[i] === action.payload) {
                    const current = state.learningPool.splice(i, 1)
                    state.learningPool.push(current[0])
                    state.teacher = teacherState.next
                    break
                }
            }
        },
        showFoundDesk: (state, action: PayloadAction<number>) => {
            state.editor = editorState.foundDesk
            state.teacher = teacherState.initial
        }
    }
})















