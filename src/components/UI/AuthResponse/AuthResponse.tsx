import { FC } from 'react';

import classes from './AuthResponse.module.scss';
import Button from '../Button/Button';

interface AuthResponseProps {
    title: string;
    message: string;
    btnText?: string;
    onBtnClick?: () => void;
}

const AuthResponse: FC<AuthResponseProps> = ({
                                                 title,
                                                 message,
                                                 btnText,
                                                 onBtnClick,
                                             }) => {
    return (
        <div data-test-id="status-block">
            <h2 className={classes['auth-response-wrapper__title']}>{title}</h2>
            <div className={classes['auth-response-wrapper__message']}>{message}</div>
            {btnText && (
                <Button
                    styleType="primary"
                    className={classes['auth-response-wrapper__button']}
                    onClick={onBtnClick}
                >
                    {btnText}
                </Button>
            )}
        </div>
    );
};

export default AuthResponse;
