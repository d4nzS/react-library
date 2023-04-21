import api from '../api';
import RateBookData from '../models/rate-book-data';
import ApiUrlsConstants from '../constants/api-urls';

class RateBookService {
    static async comment(rateBookData: RateBookData): Promise<void> {
        return await api.post(ApiUrlsConstants.COMMENT, { data: rateBookData });
    }

    static async editComment(rateBookData: RateBookData, id: number): Promise<void> {
        return await api.put(`${ApiUrlsConstants.COMMENT}/${id}`, { data: rateBookData });
    }
}

export default RateBookService;
