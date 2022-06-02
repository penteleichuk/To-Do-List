import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AppStateType = {
    initialized: boolean;
    theme: DesignType;
    notification: NotificationType;
};

export const initialState: AppStateType = {
    initialized: false,
    theme: 'light',
    notification: {
        show: false,
        message: null,
        style: 'primary',
    },
};

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppNotification(state, action: PayloadAction<NotificationType>) {
            state.notification = action.payload;
        },
        setAppTheme(state, action: PayloadAction<{ theme: DesignType }>) {
            if (action.payload.theme !== state.theme) {
                state.theme = action.payload.theme;
            }
        },
        setInitApp(state, action: PayloadAction<{ value: boolean }>) {
            state.initialized = action.payload.value
        }
    }
});


export const {setAppNotification, setAppTheme, setInitApp} = slice.actions;
export const appReducer = slice.reducer;

export type DesignType = 'light' | 'dark';

export type NotificationType = {
    show: boolean;
    message: string | null;
    style?: 'primary' | 'danger';
};