import { FC } from 'react';
import { Outlet, redirect, useNavigation } from 'react-router-dom';

import AuthLayout from '../components/Auth/AuthLayout';
import Loader from '../components/UI/Loader/Loader';
import { isAuthenticated } from '../utils/auth';

const RootAuthLayout: FC = () => {
    const isSubmitting = useNavigation().state === 'submitting';

    return (
        <>
            {isSubmitting && <Loader/>}
            <AuthLayout>
                <Outlet/>
            </AuthLayout>
        </>
    );
};

export default RootAuthLayout;

export const rootAuthLoader = () => {
    if (isAuthenticated()) {
        return redirect('/');
    }

    return null;
};
