import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import classes from './Modal.module.scss';
import useRedirect from '../../../hooks/useRedirect';
import { stopClickPropagationHandler } from '../../../utils/prevent-handlers';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross-icon.svg';

interface ModalProps {
    dataTestId: string;
    title: ReactNode;
    btnDataTestId: string;
    btnText: string;
    btnIsDisabled?: boolean;
    onSubmit: () => Promise<void>;
    additionalBtnText?: string;
    onAdditionalSubmit?: () => Promise<void>;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({
                                   dataTestId,
                                   title,
                                   btnDataTestId,
                                   btnText,
                                   btnIsDisabled,
                                   onSubmit,
                                   additionalBtnText,
                                   onAdditionalSubmit,
                                   onClose,
                                   children
                               }) => {
    const redirect = useRedirect();

    const submitHandler = async (isMainBtn: boolean): Promise<void> => {
        if (isMainBtn) {
            await onSubmit();
        } else {
            await onAdditionalSubmit?.();
        }

        onClose();
        redirect();
    };

    return (
        <>
            {createPortal(
                (
                    <Backdrop dataTestId="modal-outer" onClose={onClose}>
                        <div data-test-id={dataTestId} className={classes.modal}
                             onClick={stopClickPropagationHandler}>
                            <Button
                                dataTestId="modal-close-button"
                                styleType="default"
                                className={classes['modal__close-button']}
                                onClick={onClose}
                            >
                                <CrossIcon className={classes.modal__icon}/>
                            </Button>
                            <h2
                                data-test-id="modal-title"
                                className={classes.modal__title}>
                                {title}
                            </h2>
                            {children}
                            <Button
                                dataTestId={btnDataTestId}
                                styleType="primary"
                                disabled={btnIsDisabled}
                                className={classes.modal__button}
                                onClick={() => submitHandler(true)}
                            >
                                {btnText}
                            </Button>
                            {additionalBtnText && (
                                <Button
                                    dataTestId="booking-cancel-button"
                                    styleType="secondary"
                                    className={classNames(
                                        classes.modal__button,
                                        classes.modal__button_additional
                                    )}
                                    onClick={() => submitHandler(false)}
                                >
                                    {additionalBtnText}
                                </Button>
                            )}
                        </div>
                    </Backdrop>
                ),
                document.getElementById('modal-root') as HTMLElement
            )}
        </>
    );
};

export default Modal;
