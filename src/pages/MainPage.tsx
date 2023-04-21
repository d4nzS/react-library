import { FC } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';

import Books from '../models/books';
import Categories from '../models/category';
import ToolsMenu from '../components/Main/Sections/ToolsMenu/ToolsMenu';
import BooksList from '../components/Main/Sections/BooksList/BooksList';
import AsyncWrapper from '../components/Shared/AsyncWrapper/AsyncWrapper';

const MainPage: FC = () => {
    const { category: categoryPath } = useParams();
    const { books, categories } = useRouteLoaderData('root') as {
        books: Promise<Books>,
        categories: Promise<Categories>
    };

    return (
        <>
            <main data-test-id="main-page" style={{ flexGrow: 1 }}>
                <AsyncWrapper promise={Promise.all([books, categories])}>
                    {([loadedBooks, loadedCategories]: [Books, Categories]) => {
                        const selectedBooks = categoryPath === 'all'
                            ? loadedBooks
                            : loadedBooks.filter(book => book.categories?.includes(
                                loadedCategories.find(category => category.path === categoryPath)!.name)
                            );

                        return (
                            <>
                                <ToolsMenu/>
                                <BooksList books={selectedBooks}/>
                            </>
                        );
                    }}
                </AsyncWrapper>
            </main>
            <AsyncWrapper promise={Promise.all([categories, books])} isMainLoader/>
        </>
    );
};

export default MainPage;
