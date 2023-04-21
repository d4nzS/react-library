import { FC, ReactNode } from 'react';

import classes from './AuthLayout.module.scss';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div data-test-id="auth" className={classes['auth-layout']}>
            <h1 className={classes['auth-layout__title']}>Cleverland</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
