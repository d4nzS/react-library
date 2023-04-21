import api from '../api';
import BookingData from '../models/booking-data';
import BookingResponse from '../models/booking-response';
import ApiUrlsConstants from '../constants/api-urls';

class BookingService {
    static async order(bookingData: BookingData): Promise<BookingResponse> {
        return (await api.post(ApiUrlsConstants.ORDER, { data: bookingData })).data;
    }

    static async reorder(bookingId: number, bookingData: BookingData): Promise<BookingResponse> {
        return (await api.put(`${ApiUrlsConstants.ORDER}/${bookingId}`, { data: bookingData })).data;
    }

    static async cancel(bookingId: number): Promise<void> {
        return await api.delete(`${ApiUrlsConstants.ORDER}/${bookingId}`);
    }
}

export default BookingService;
