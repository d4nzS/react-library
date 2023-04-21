import { FC, useState } from 'react';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { Booking } from '../../../models/books';
import { cancelBooking, orderBook } from '../../../store/http/actions';
import TimeMeasurementsConstants from './constants';
import { getCurrentUserId } from '../../../utils/auth';
import Calendar from './Calendar/Calendar';
import Modal from '../../UI/Modal/Modal';

interface BookingModalProps {
    bookId: string;
    booking?: Booking;
    onClose: () => void;
    onBooking: (booking: Booking) => void;
    onCancelBooking: () => void;
}

const BookingModal: FC<BookingModalProps> = ({
                                                 bookId,
                                                 booking,
                                                 onClose,
                                                 onBooking,
                                                 onCancelBooking
                                             }) => {
    const dispatch = useAppDispatch();
    const bookingOrderDate = booking?.dateOrder !== undefined
        ? new Date(booking.dateOrder)
        : undefined;
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(bookingOrderDate);

    console.log(selectedDay)

    const selectDayHandler = (day: Date): void => {
        setSelectedDay(day);
    };

    const orderBookHandler = async (): Promise<void> => {
        if (!selectedDay) {
            throw new Error('Selected day must be exist.');
        }

        await dispatch(orderBook({
            order: true,
            dateOrder: new Date(+selectedDay
                + TimeMeasurementsConstants.MILLISECONDS_IN_SECOND
                * TimeMeasurementsConstants.SECONDS_IN_MINUTE
                * TimeMeasurementsConstants.MINUTES_IN_HOUR
                * 3
            ).toISOString(),
            book: bookId,
            customer: getCurrentUserId()
        }, onBooking, booking?.id));
    };

    const cancelBookingOrderHandler = async (): Promise<void> => {
        if (!booking) {
            throw new Error('Booking must be exist.');
        }

        await dispatch(cancelBooking(booking.id, onCancelBooking));
    };

    return (
        <Modal
            dataTestId="booking-modal"
            title={(
                <>
                    {booking ? 'Изменение' : 'Выбор'} даты<br/> бронирования
                </>
            )}
            btnDataTestId="booking-button"
            btnText="Забронировать"
            btnIsDisabled={booking
                ? selectedDay?.getDate() === bookingOrderDate?.getDate() || !selectedDay
                : !selectedDay}
            onSubmit={orderBookHandler}
            additionalBtnText={booking ? 'Отменить бронь' : undefined}
            onAdditionalSubmit={cancelBookingOrderHandler}
            onClose={onClose}
        >
            <Calendar
                selectedDate={selectedDay?.getDate()}
                onSelectDay={selectDayHandler}
            />
        </Modal>
    );
};

export default BookingModal;
