import { FC } from 'react';
import {
    defer,
    LoaderFunctionArgs,
    useLoaderData,
    useLocation,
    useParams,
    useRouteLoaderData,
} from 'react-router-dom';

import Book from '../models/book';
import Books from '../models/books';
import Categories from '../models/category';
import BookContainer from '../components/Book/BookContainer';
import AsyncWrapper from '../components/Shared/AsyncWrapper/AsyncWrapper';
import BookService from '../services/book-service';
import Overview from '../components/Book/Sections/Overview';
import Rating from '../components/Book/Sections/Rating';
import Details from '../components/Book/Sections/Details';
import Reviews from '../components/Book/Sections/Reviews';

const BookPage: FC = () => {
    const { book } = useLoaderData() as { book: Promise<Book> };
    const { books, categories } = useRouteLoaderData('root') as {
        books: Promise<Books>,
        categories: Promise<Categories>
    };
    const { bookId } = useParams();
    const isFromProfilePage = !!useLocation().state?.isFromProfilePage;

    return (
        <>
            <BookContainer>
                <AsyncWrapper promise={book}>
                    {(loadedBook: Book) => (
                        <main>
                            <Overview
                                {...loadedBook}
                                id={bookId!}
                            />
                            <Rating rating={loadedBook.rating}/>
                            <Details {...loadedBook}/>
                            <Reviews
                                bookId={bookId!}
                                comments={loadedBook.comments}
                                modalIsOpenInitially={isFromProfilePage}
                            />
                        </main>
                    )}
                </AsyncWrapper>
            </BookContainer>
            <AsyncWrapper promise={Promise.all([book, books, categories])} isMainLoader/>
        </>
    );
};

export default BookPage;

export const bookLoader = ({ params }: LoaderFunctionArgs) => {
    return defer({ book: BookService.getBook(params.bookId!) });
};
