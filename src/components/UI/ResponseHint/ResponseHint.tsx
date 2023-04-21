import { FC, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import classes from './ResponseHint.module.scss';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { HIDE_RESPONSE_DURATION } from './constants';
import { httpActions } from '../../../store/http/slice';
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error-icon.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success-icon.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross-icon.svg';

interface ResponseHintProps {
    isSucceed: boolean;
    message: string;
}

const ResponseHint: FC<ResponseHintProps> = ({ isSucceed, message }) => {
    const dispatch = useAppDispatch();

    const hideResponseMessageHandler = (): void => {
        dispatch(httpActions.removeResponse());
    };

    useEffect(() => {
        setTimeout(() => hideResponseMessageHandler(), HIDE_RESPONSE_DURATION);
    }, []);

    return (
        <>
            {createPortal(
                <div
                    data-test-id="error"
                    className={classNames(
                        classes.response,
                        { [classes.response__succeed]: isSucceed }
                    )}
                >
                    {!isSucceed && <ErrorIcon className={classNames(
                        classes.response__icon,
                        classes.response__icon_type_hint
                    )}/>}
                    {isSucceed && <SuccessIcon className={classNames(
                        classes.response__icon,
                        classes.response__icon_type_hint
                    )}/>}
                    <span>{message}</span>
                    <button
                        data-test-id="alert-close"
                        type="button"
                        className={classes.response__button}
                        onClick={hideResponseMessageHandler}
                    >
                        <CrossIcon className={classNames(
                            classes.response__icon,
                            classes.response__icon_type_close
                        )}/>
                    </button>
                </div>,
                document.getElementById('response-root') as HTMLElement
            )}
        </>
    );
};

export default memo(ResponseHint);
