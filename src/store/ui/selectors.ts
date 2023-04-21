import { RootState } from '../index';

export const currentBreakpointSelector = (state: RootState) => state.ui.currentBreakpoint;

export const mobileAndTabletNavbarIsShownSelector = (state: RootState) => state.ui.mobileAndTabletNavbarIsShown;

export const booksDisplayTypeSelector = (state: RootState) => state.ui.booksDisplayType;

export const booksSortByRatingIsInDescendingOrderSelector = (state: RootState) => state.ui.booksSortByRatingIsInDescendingOrder;

export const booksSearchSubstringSelector = (state: RootState) => state.ui.booksSearchSubstring;
