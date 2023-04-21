import { FC, useEffect } from 'react';
import {
    defer,
    Outlet,
    redirect,
    ScrollRestoration,
    useLocation,
} from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { isLoadingSelector, responseSelector } from '../store/http/selectors';
import { uiActions } from '../store/ui/slice';
import ResponseHint from '../components/UI/ResponseHint/ResponseHint';
import Layout from '../components/Layout/Layout';
import { isAuthenticated } from '../utils/auth';
import AppUrlsConstants from '../constants/urls';
import UserService from '../services/user-service';
import BookService from '../services/book-service';
import Loader from '../components/UI/Loader/Loader';

const RootLayout: FC = () => {
    const pageWasReloaded = useLocation().state?.pageWasReload;
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const response = useAppSelector(responseSelector);

    useEffect(() => {
        const clickBodyHandler = () => {
            dispatch(uiActions.hideMobileAndTabletNavbar());
        };

        document.body.addEventListener('click', clickBodyHandler);

        return () => {
            document.body.removeEventListener('click', clickBodyHandler);
        };
    }, []);

    return (
        <>
            {isLoading && <Loader/>}
            {response && <ResponseHint
                isSucceed={response.isSucceed}
                message={response.message}
            />}
            {!pageWasReloaded && <ScrollRestoration/>}
            <Layout>
                <Outlet/>
            </Layout>
        </>
    );
};

export default RootLayout;

export const rootLoader = () => {
    if (!isAuthenticated()) {
        return redirect(AppUrlsConstants.AUTH);
    }

    return defer({
        currentUser: UserService.getCurrentUser(),
        categories: BookService.getCategories(),
        books: BookService.getBooks()
    });
};
