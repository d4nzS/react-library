import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import classes from './AuthModal.module.scss';

interface AuthModalProps {
    isResponse?: boolean;
    className: string;
    children: ReactNode;
}

const AuthModal: FC<AuthModalProps> = ({
                                           isResponse,
                                           className,
                                           children
                                       }) => {
    return (
        <div className={classNames(
            classes['auth-modal'],
            { [classes['auth-modal_type_response']]: isResponse },
            className
        )}>
            {children}
        </div>
    );
};

export default AuthModal;
