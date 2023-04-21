import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import classes from './BookItem.module.scss';
import { BookItem as Book } from '../../../models/books';
import useRedirect from '../../../hooks/useRedirect';
import AppUrlsConstants from '../../../constants/urls';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { booksDisplayTypeSelector, booksSearchSubstringSelector } from '../../../store/ui/selectors';
import useModal from '../../../hooks/useModal';
import useBooking from '../../../hooks/useBooking';
import { cancelBooking } from '../../../store/http/actions';
import Image from '../../UI/Image/Image';
import RatingStars from '../../UI/RatingStars/RatingStars';
import Button from '../../UI/Button/Button';
import BookingModal from '../BookingModal/BookingModal';
import { getBookingBtnProps, highlightSubstringsInBookTitle } from './utils';

export interface BookItemProps extends Book {
    isCommented?: boolean;
}

const BookItem: FC<BookItemProps> = ({
                                         id,
                                         title,
                                         rating,
                                         authors,
                                         issueYear,
                                         image,
                                         booking,
                                         delivery,
                                         histories,
                                         isCommented
                                     }) => {
    const navigate = useNavigate();
    const redirect = useRedirect();
    const { pathname: currentUrl } = useLocation();
    const isProfilePage = currentUrl.startsWith(AppUrlsConstants.PROFILE);
    const dispatch = useAppDispatch();
    const booksDisplayTypeIsList = useAppSelector(booksDisplayTypeSelector) === 'list'
        || isProfilePage && !histories;
    const booksSearchSubstring = useAppSelector(booksSearchSubstringSelector);
    const {
        modalIsShown: bookingModalIsShown,
        showModalHandler: showBookingModalHandler,
        hideModalHandler: hideBookingModalHandler
    } = useModal();
    const {
        currentBooking,
        bookingHandler,
        cancelBookingHandler
    } = useBooking(booking);
    const deliveryDate = delivery?.dateHandedTo
        ? new Date(delivery.dateHandedTo)
        : undefined;

    const linkToBookHandler = (): void => {
        navigate(isProfilePage ? `${AppUrlsConstants.BOOKS_ALL}/${id}` : id.toString());
    };

    const linkToRateBookHandler = (): void => {
        navigate(
            `${AppUrlsConstants.BOOKS_ALL}/${id}`,
            { state: { isFromProfilePage: isProfilePage } }
        );
    };

    const cancelBookingFromProfilePageHandler = async (): Promise<void> => {
        await dispatch(cancelBooking(booking!.id));

        redirect();
    };

    const btnProps = getBookingBtnProps({
        booking: currentBooking,
        delivery,
        history: histories?.[0],
        isProfilePage,
        showBookingModalHandler,
        cancelBookingFromProfilePageHandler,
        linkToRateBookHandler,
        isCommented
    });

    const btnIsVisible = isProfilePage && !delivery || !isProfilePage;

    return (
        <>
            {bookingModalIsShown && <BookingModal
                bookId={id.toString()}
                booking={currentBooking}
                onClose={hideBookingModalHandler}
                onBooking={bookingHandler}
                onCancelBooking={cancelBookingHandler}
            />}
            <li
                data-test-id="card"
                className={classNames(
                    classes['book-item'],
                    { [classes['book-item_type_list']]: booksDisplayTypeIsList }
                )}
                onClick={linkToBookHandler}
            >
                <Image
                    src={image?.url}
                    alt={title}
                    className={classNames(
                        classes['book-item__image'],
                        { [classes['book-item__image_type_list']]: booksDisplayTypeIsList }
                    )}
                    defaultIconClassName={classNames(
                        classes['book-item__image-icon'],
                        { [classes['book-item__image-icon_type_list']]: booksDisplayTypeIsList }
                    )}
                />
                <RatingStars
                    rating={rating}
                    className={classNames(
                        classes['book-item__rating'],
                        { [classes['book-item__rating_type_list']]: booksDisplayTypeIsList }
                    )}
                    starIconClassName={classNames(
                        classes['book-item__star-icon'],
                        { [classes['book-item__star-icon_type_list']]: booksDisplayTypeIsList }
                    )}
                />
                <h3 className={classNames(
                    classes['book-item__title'],
                    { [classes['book-item__title_type_list']]: booksDisplayTypeIsList }
                )}>
                    {highlightSubstringsInBookTitle(title, booksSearchSubstring)}
                </h3>
                <span className={classNames(
                    classes['book-item__span'],
                    { [classes['book-item__span_type_list']]: booksDisplayTypeIsList }
                )}>
                    {authors?.map(author => `${author}, `)} {issueYear}
                </span>
                {btnIsVisible && (
                    <Button
                        {...btnProps}
                        className={classNames(
                            classes['book-item__button'],
                            { [classes['book-item__button_type_list']]: booksDisplayTypeIsList }
                        )}
                    >
                        {btnProps.text}
                    </Button>
                )}
                {isProfilePage && delivery && (
                    <span className={classes['book-item__delivery']}>
                        Возврат {deliveryDate!.getDate()}.{(deliveryDate!.getMonth() + 1).toString().padStart(2, '0')}
                    </span>
                )}
            </li>
        </>
    );
};

export default memo(BookItem);
