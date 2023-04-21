import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Response {
    isSucceed: boolean;
    message: string;
}

interface httpState {
    isLoading: boolean;
    response?: Response;
}

const initialState: httpState = {
    isLoading: false
};

const httpSlice = createSlice({
    name: 'http',
    initialState,
    reducers: {
        switchIsLoading(state) {
            state.isLoading = !state.isLoading;
        },
        setResponse(state, action: PayloadAction<Response>) {
            state.response = action.payload;
        },
        removeResponse(state) {
            state.response = undefined;
        }
    }
});

export const httpActions = httpSlice.actions;

export default httpSlice;
