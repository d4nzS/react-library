import api from '../api';
import Categories from '../models/category';
import Books from '../models/books';
import Book from '../models/book';
import ApiUrlsConstants from '../constants/api-urls';

class BookService {
    static async getCategories(): Promise<Categories> {
        return (await api.get(ApiUrlsConstants.GET_CATEGORIES)).data;
    }

    static async getBooks(): Promise<Books> {
        return (await api.get(ApiUrlsConstants.GET_BOOKS)).data;
    }

    static async getBook(id: string): Promise<Book> {
        return (await api.get(`${ApiUrlsConstants.GET_BOOKS}/${id}`)).data;
    }
}

export default BookService;
