import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BooksDisplayType = 'window' | 'list';

type Breakpoint = 'xs' | 'md' | 'xxl';

interface UIState {
    currentBreakpoint: Breakpoint;
    mobileAndTabletNavbarIsShown: boolean;
    booksDisplayType: BooksDisplayType;
    booksSortByRatingIsInDescendingOrder: boolean;
    booksSearchSubstring: string;
}

const getBreakpoint = (): Breakpoint => {
    if (window.innerWidth < 768) {
        return 'xs';
    }

    if (window.innerWidth < 1440) {
        return 'md';
    }

    return 'xxl';
};

const initialState: UIState = {
    currentBreakpoint: getBreakpoint(),
    mobileAndTabletNavbarIsShown: false,
    booksDisplayType: localStorage.getItem('books-display') as BooksDisplayType ?? 'window',
    booksSortByRatingIsInDescendingOrder: JSON.parse(localStorage.getItem('books-sorting-is-in-descending-order') ?? 'true'),
    booksSearchSubstring: ''
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        getCurrentBreakpoint(state) {
            state.currentBreakpoint = getBreakpoint();
        },
        switchMobileAndTabletNavbarVision(state) {
            state.mobileAndTabletNavbarIsShown = !state.mobileAndTabletNavbarIsShown;
        },
        hideMobileAndTabletNavbar(state) {
            state.mobileAndTabletNavbarIsShown = false;
        },
        changeBooksDisplayType(state, action: PayloadAction<BooksDisplayType>) {
            state.booksDisplayType = action.payload;

            localStorage.setItem('books-display', action.payload);
        },
        changeBooksSorting(state) {
            state.booksSortByRatingIsInDescendingOrder = !state.booksSortByRatingIsInDescendingOrder;

            localStorage.setItem('books-sorting-is-in-descending-order', state.booksSortByRatingIsInDescendingOrder.toString());
        },
        changeBooksSearchSubstring(state, action: PayloadAction<string>) {
            state.booksSearchSubstring = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
