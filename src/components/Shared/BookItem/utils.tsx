import { Booking, Delivery, History } from '../../../models/books';
import { BtnStyleType } from '../../UI/Button/Button';
import createBtnTextFromBookStatus from '../../../utils/create-btn-text-from-book-status';
import { getCurrentUserId } from '../../../utils/auth';
import {Fragment, ReactNode} from "react";
import classes from "./BookItem.module.scss";

interface GetBookingBtnPropsParams {
    booking?: Booking;
    delivery?: Delivery;
    history?: History;
    isProfilePage: boolean;
    showBookingModalHandler: () => void;
    cancelBookingFromProfilePageHandler: () => void;
    linkToRateBookHandler: () => void;
    isCommented?: boolean;
}

interface GetBookingBtnPropsReturnValue {
    dataTestId: string;
    styleType: BtnStyleType;
    onClick: () => void;
    disabled?: boolean;
    text: string;
}

export const getBookingBtnProps: (params: GetBookingBtnPropsParams) => GetBookingBtnPropsReturnValue = ({
                                                                                 booking,
                                                                                 delivery,
                                                                                 history,
                                                                                 isProfilePage,
                                                                                 showBookingModalHandler,
                                                                                 cancelBookingFromProfilePageHandler,
                                                                                 linkToRateBookHandler,
                                                                                 isCommented
                                                                             }) => {
    const btnProps: GetBookingBtnPropsReturnValue = {
        dataTestId: 'booking-button',
        styleType: (booking?.order || delivery?.handed)
            ? 'secondary'
            : 'primary',
        onClick: showBookingModalHandler,
        disabled: !isProfilePage && (booking?.order
                && booking.customerId !== +getCurrentUserId()
                || delivery?.handed),
        text: createBtnTextFromBookStatus(booking || delivery)
    };

    if (isProfilePage) {
        btnProps.styleType = 'primary';
    }

    if (isProfilePage && booking) {
        btnProps.dataTestId = 'cancel-booking-button';
        btnProps.onClick = cancelBookingFromProfilePageHandler;
        btnProps.text = 'Отменить бронь';
    }

    if (isProfilePage && history) {
        btnProps.dataTestId = 'history-review-button';
        btnProps.onClick = linkToRateBookHandler;
        btnProps.text = 'Оставить отзыв';
    }

    if (isProfilePage && isCommented) {
        btnProps.styleType = 'secondary';
        btnProps.text = 'Изменить оценку';
    }

    return btnProps;
};

export const highlightSubstringsInBookTitle = (title: string, searchString: string): ReactNode[] => {
    return title
        .split(new RegExp(`(${searchString})`, 'gi'))
        .map((part, index) => part.toLowerCase() === searchString
            ? (
                <span
                    data-test-id="highlight-matches"
                    key={index}
                    className={classes['book-item__title_highlighted']}
                >
                    {part}
                </span>
            )
            : <Fragment key={index}>{part}</Fragment>);
};
