import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import classes from './AuthFormWrapper.module.scss';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-icon.svg';

interface AuthFormWrapperProps {
    authType: 'registration' | 'auth' | 'forgot-pass';
    title: string;
    withLink?: boolean;
    children: ReactNode | ReactNode[];
}

const AuthFormWrapper: FC<AuthFormWrapperProps> = ({
                                                       authType,
                                                       title,
                                                       withLink = true,
                                                       children
                                                   }) => {
    return (
        <>
            <h2 className={classes['auth-form-wrapper__title']}>{title}</h2>
            {children}
            {withLink && (
                <div className={classes['auth-form-wrapper__account-container']}>
                    <span className={classes['auth-form-wrapper__span']}>
                        {authType === 'registration' ? 'Есть учётная запись?' : 'Нет учётной записи?'}
                    </span>
                    <Link
                        to={`/${authType !== 'registration' ? 'registration' : 'auth'}`}
                        className={classes['auth-form-wrapper__link']}
                    >
                        <span>{authType !== 'registration' ? 'Регистрация' : 'Войти'}</span>
                        <ArrowIcon/>
                    </Link>
                </div>
            )}
        </>
    );
};

export default AuthFormWrapper;
