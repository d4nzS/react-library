import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui/slice';
import httpSlice from './http/slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        http: httpSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
