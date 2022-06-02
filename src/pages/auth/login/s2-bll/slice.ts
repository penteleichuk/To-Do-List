import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthStateType = {
    isAuth: boolean;
};

export const initialState: AuthStateType = {
    isAuth: false,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value;
        },
    }
})

export const {setAuth} = slice.actions;
export const authReducer = slice.reducer;