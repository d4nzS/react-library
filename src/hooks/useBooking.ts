import { useEffect, useState } from 'react';

import { Booking } from '../models/books';

const useBooking = (bookingObj?: Booking) => {
    const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(bookingObj);

    useEffect((() => {
        setCurrentBooking(bookingObj);
    }), [bookingObj]);

    const bookingHandler = (newBooking: Booking): void => {
        setCurrentBooking(newBooking);
    };

    const cancelBookingHandler = (): void => {
        setCurrentBooking(undefined);
    };

    return {
        currentBooking,
        updateBookingHandler: setCurrentBooking,
        bookingHandler,
        cancelBookingHandler
    };
};

export default useBooking;
