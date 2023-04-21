import { FC, ReactNode, useEffect } from 'react';

import classes from './Backdrop.module.scss';

interface BackdropProps {
    dataTestId?: string;
    onClose?: () => void;
    children: ReactNode;
}

const Backdrop: FC<BackdropProps> = ({
                                         dataTestId,
                                         onClose,
                                         children
                                     }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            data-test-id={dataTestId}
            className={classes.backdrop}
            onClick={onClose}
        >
            {children}
        </div>
    );
};

export default Backdrop;
