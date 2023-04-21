import { AppDispatch } from '../index';
import { httpActions } from './slice';
import BookingData from '../../models/booking-data';
import { Booking } from '../../models/books';
import BookingService from '../../services/booking-service';
import RateBookData from '../../models/rate-book-data';
import RateBookService from '../../services/rate-book-service';
import UserService from '../../services/user-service';
import UserRegistrationData from '../../models/user-registration-data';

export const orderBook = (
    bookingData: BookingData,
    fallback: (booking: Booking) => void,
    previousBookingId?: number
) => {
    return async (dispatch: AppDispatch) => {
        dispatch(httpActions.removeResponse());
        dispatch(httpActions.switchIsLoading());

        try {
            let newBookingId: number;

            if (previousBookingId) {
                newBookingId = (await BookingService.reorder(previousBookingId, bookingData)).id;

                dispatch(httpActions.setResponse({
                    isSucceed: true,
                    message: 'Изменения успешно сохранены!'
                }));
            } else {
                newBookingId = (await BookingService.order(bookingData)).id;

                dispatch(httpActions.setResponse({
                    isSucceed: true,
                    message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль'
                }));
            }

            fallback({
                id: newBookingId,
                order: true,
                dateOrder: bookingData.dateOrder,
                customerId: +bookingData.customer
            });
        } catch {
            if (previousBookingId) {
                dispatch(httpActions.setResponse({
                    isSucceed: false,
                    message: 'Изменения не были сохранены. Попробуйте позже!'
                }));
            } else {
                dispatch(httpActions.setResponse({
                    isSucceed: false,
                    message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
                }));
            }
        }

        dispatch(httpActions.switchIsLoading());
    };
};

export const cancelBooking = (bookingId: number, fallback?: () => void) => {
    return async (dispatch: AppDispatch) => {
        dispatch(httpActions.removeResponse());
        dispatch(httpActions.switchIsLoading());

        try {
            await BookingService.cancel(bookingId);

            dispatch(httpActions.setResponse({
                isSucceed: true,
                message: 'Бронирование книги успешно отменено!'
            }));

            fallback?.();
        } catch {
            dispatch(httpActions.setResponse({
                isSucceed: false,
                message: 'Не удалось снять бронирование книги. Попробуйте позже!'
            }));
        }

        dispatch(httpActions.switchIsLoading());
    };
};

export const rateBook = (newComment: RateBookData, previousCommentId?: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(httpActions.removeResponse());
        dispatch(httpActions.switchIsLoading());

        try {
            if (previousCommentId) {
                await RateBookService.editComment(newComment, previousCommentId);

                dispatch(httpActions.setResponse({
                    isSucceed: true,
                    message: 'Спасибо, что нашли время изменить оценку!'
                }));
            } else {
                await RateBookService.comment(newComment);

                dispatch(httpActions.setResponse({
                    isSucceed: true,
                    message: 'Спасибо, что нашли время оценить книгу!'
                }));
            }
        } catch {
            if (previousCommentId) {
                dispatch(httpActions.setResponse({
                    isSucceed: false,
                    message: 'Изменения не были сохранены. Попробуйте позже!'
                }));
            } else {
                dispatch(httpActions.setResponse({
                    isSucceed: false,
                    message: 'Оценка не была отправлена. Попробуйте позже!'
                }));
            }
        }

        dispatch(httpActions.switchIsLoading());
    };
};

export const changeAvatar = (formData: FormData) => {
    return async (dispatch: AppDispatch) => {
        dispatch(httpActions.removeResponse());
        dispatch(httpActions.switchIsLoading());

        try {
            const { id } = await UserService.uploadAvatar(formData);
            await UserService.changeAvatar(id);

            dispatch(httpActions.setResponse({
                isSucceed: true,
                message: 'Фото успешно сохранено!'
            }));
        } catch {
            dispatch(httpActions.setResponse({
                isSucceed: false,
                message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
            }));
        }

        dispatch(httpActions.switchIsLoading());
    };
};

export const changeCredentials = (data: UserRegistrationData) => {
    return async (dispatch: AppDispatch) => {
        dispatch(httpActions.removeResponse());
        dispatch(httpActions.switchIsLoading());

        try {
            await UserService.editCredentials(data);

            dispatch(httpActions.setResponse({
                isSucceed: true,
                message: 'Изменения успешно сохранены!'
            }));
        } catch {
            dispatch(httpActions.setResponse({
                isSucceed: true,
                message: 'Изменения не были сохранены. Попробуйте позже!'
            }));
        }

        dispatch(httpActions.switchIsLoading());
    };
};
