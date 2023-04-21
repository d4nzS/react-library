import { Booking, Delivery } from '../models/books';

const createDayMonthDateFormat = (date: string): string => {
    const formatter = new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'numeric'
    });

    return formatter.format(new Date(date));
};

const createBtnTextFromBookStatus = (status?: | Booking | Delivery): string => {
    let msg = 'Забронирована';

    if (!status) {
        msg = 'Забронировать';
    }

    if (status && 'handed' in status) {
        msg = `Занята ${status.dateHandedTo
            ? `до ${createDayMonthDateFormat(status.dateHandedTo)}`
            : ''}`;
    }

    return msg;
};

export default createBtnTextFromBookStatus;
