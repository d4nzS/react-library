import { RootState } from '../index';

export const isLoadingSelector = (state: RootState) => state.http.isLoading;

export const responseSelector = (state: RootState) => state.http.response;
