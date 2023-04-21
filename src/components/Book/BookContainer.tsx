import { FC, ReactNode } from 'react';
import { Link, useParams, useRouteLoaderData } from 'react-router-dom';

import classes from './BookContainer.module.scss';
import AppUrlsConstants from '../../constants/urls';
import Categories from '../../models/category';
import Book from '../../models/book';
import AsyncWrapper from '../Shared/AsyncWrapper/AsyncWrapper';
import { ReactComponent as SlashIcon } from '../../assets/icons/slash-icon.svg';
import Navbar from '../Shared/Navbar/Navbar';

const DefaultCategoryLink: FC = () => {
    return (
        <>
            <Link to={AppUrlsConstants.BOOKS_ALL}>
                Все книги
            </Link>
            <SlashIcon className={classes.nav__icon}/>
        </>
    );
};

interface BookContainerProps {
    children: ReactNode;
}

const BookContainer: FC<BookContainerProps> = ({ children }) => {
    const { book } = useRouteLoaderData('book') as { book: Promise<Book> };
    const { categories } = useRouteLoaderData('root') as { categories: Promise<Categories> };
    const { category: categoryPath } = useParams();

    return (
        <div className={classes['book-container']}>
            <Navbar desktopNavbarIsShown={false}/>
            <nav className={classes.nav}>
                <AsyncWrapper
                    promise={Promise.all([book, categories])}
                    errorElement={<DefaultCategoryLink/>}
                >
                    {([{ title, categories }, loadedCategories]: [Book, Categories]) => (
                        <>
                            {categories?.[0] && (
                                <>
                                    <Link
                                        data-test-id="breadcrumbs-link"
                                        to={`${AppUrlsConstants.BOOKS}/${categoryPath}`}
                                    >
                                        {categoryPath === 'all'
                                            ? 'Все книги'
                                            : loadedCategories.find(category => category.path === categoryPath)!.name}
                                    </Link>
                                    <SlashIcon className={classes.nav__icon}/>
                                </>
                            )}
                            {!categories && <DefaultCategoryLink/>}
                            <span data-test-id="book-name">{title}</span>
                        </>
                    )}
                </AsyncWrapper>
            </nav>
            {children}
        </div>
    );
};

export default BookContainer;
