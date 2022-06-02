import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthStateType = {
    isAuth: boolean;
};

export const initialState: AuthStateType = {
    isAuth: false,
};

const authSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ value: boolean }>) {
            state.isAuth = action.payload.value;
        },
    }
})

export const {setAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;