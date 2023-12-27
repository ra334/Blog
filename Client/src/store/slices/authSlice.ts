import { createSlice } from '@reduxjs/toolkit'

type ActionType = {
    payload: string
}

type StateType = {
    login: string;
    nickname: string;
    password: string;
}



const initialState: StateType = {
    login: '',
    nickname: '',
    password: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addLogin: (state: StateType, action: ActionType) => {
            state.login = action.payload
        },

        addNickname: (state: StateType, action: ActionType) => {
            state.nickname = action.payload
        },

        addPassword: (state: StateType, action: ActionType) => {
            state.password = action.payload
        },

        resetAuth: () => {
            return initialState
        }
    }
})

export const { addLogin, addNickname, addPassword, resetAuth } = authSlice.actions
export default authSlice.reducer
