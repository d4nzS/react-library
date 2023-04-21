import { FC, useEffect } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';

import AppUrlsConstants from './constants/urls';
import RootLayout, { rootLoader } from './pages/RootLayout';
import MainLayout from './pages/MainLayout';
import MainPage from './pages/MainPage';
import RulesPage from './pages/RulesPage';
import ContractPage from './pages/ContractPage';
import BookPage, { bookLoader } from './pages/BookPage';
import ProfilePage from './pages/ProfilePage';
import RootAuthLayout, { rootAuthLoader } from './pages/RootAuthLayout';
import RegistrationPage, { registrationAction } from './pages/RegistrationPage';
import LoginPage, { loginAction } from './pages/LoginPage';
import PassRecoveryPage, { forgotPassAction } from './pages/PassRecoveryPage';
import useAppDispatch from './hooks/useAppDispatch';
import { uiActions } from './store/ui/slice';

const router = createHashRouter([
    {
        path: '/',
        id: 'root',
        element: <RootLayout/>,
        loader: rootLoader,
        children: [
            {
                path: '',
                id: 'main',
                element: <MainLayout/>,
                children: [
                    {
                        index: true,
                        element: <Navigate to={AppUrlsConstants.BOOKS_ALL}/>,
                    },
                    {
                        path: AppUrlsConstants.BOOKS,
                        children: [
                            {
                                index: true,
                                element: <Navigate to={AppUrlsConstants.BOOKS_ALL}/>
                            },
                            {
                                path: ':category',
                                element: <MainPage/>
                            }
                        ]
                    },
                    {
                        path: AppUrlsConstants.TERMS,
                        element: <RulesPage/>
                    },
                    {
                        path: AppUrlsConstants.CONTRACT,
                        element: <ContractPage/>
                    },
                ],
            },
            {
                path: `${AppUrlsConstants.BOOKS}/:category/:bookId`,
                id: 'book',
                element: <BookPage/>,
                loader: bookLoader
            },
            {
                path: AppUrlsConstants.PROFILE,
                element: <ProfilePage/>,
            }
        ]
    },
    {
        element: <RootAuthLayout/>,
        loader: rootAuthLoader,
        children: [
            {
                path: AppUrlsConstants.REGISTRATION,
                element: <RegistrationPage/>,
                action: registrationAction
            },
            {
                path: AppUrlsConstants.AUTH,
                element: <LoginPage/>,
                action: loginAction
            },
            {
                path: AppUrlsConstants.FORGOT_PASS,
                element: <PassRecoveryPage/>,
                action: forgotPassAction
            }
        ]
    }
]);

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const resizeWindowHandler = () => {
            dispatch(uiActions.getCurrentBreakpoint());
        };

        window.addEventListener('resize', resizeWindowHandler);

        return () => {
            window.removeEventListener('resize', resizeWindowHandler);
        };
    }, []);

    return <RouterProvider router={router}/>;
};

export default App;
