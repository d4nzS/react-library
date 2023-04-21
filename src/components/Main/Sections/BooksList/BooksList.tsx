import { FC } from 'react';
import classNames from 'classnames';

import classes from './BooksList.module.scss';
import Books from '../../../../models/books';
import useAppSelector from '../../../../hooks/useAppSelector';
import {
    booksDisplayTypeSelector,
    booksSortByRatingIsInDescendingOrderSelector,
    booksSearchSubstringSelector
} from '../../../../store/ui/selectors';
import BookItem from '../../../Shared/BookItem/BookItem';

interface BooksListProps {
    books: Books;
}

const BooksList: FC<BooksListProps> = ({books}) => {
    const booksDisplay = useAppSelector(booksDisplayTypeSelector);
    const booksSortByRatingIsInDescendingOrder = useAppSelector(booksSortByRatingIsInDescendingOrderSelector);
    const booksSearchSubstring = useAppSelector(booksSearchSubstringSelector);

    if (!books.length) {
        return (
            <section>
                <h2
                    data-test-id="empty-category"
                    className={classes.books__title}
                >
                    В этой категории книг ещё нет
                </h2>
            </section>
        );
    }

    if (books.some(book => book.rating)) {
        books = books.slice();

        books.sort((prevBook, book) => (book.rating ?? 0) - (prevBook.rating ?? 0));

        !booksSortByRatingIsInDescendingOrder && books.reverse();
    }

    books = books.filter(book => new RegExp(booksSearchSubstring, 'i').test(book.title));

    return (
        <section>
            {books.length
                ? (
                    <ul className={classNames(
                        classes.books__list,
                        {[classes.books__list_type_list]: booksDisplay === 'list'}
                    )}>
                        {books.map(book => <BookItem key={book.id} {...book}/>)}
                    </ul>
                )
                : (
                    <h2
                        data-test-id="search-result-not-found"
                        className={classes.books__title}
                    >
                        По запросу ничего не найдено
                    </h2>
                )}
        </section>
    );
};

export default BooksList;
