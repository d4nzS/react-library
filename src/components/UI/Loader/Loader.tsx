import { FC } from 'react';
import { createPortal } from 'react-dom';

import classes from './Loader.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import { ReactComponent as LoaderIcon } from '../../../assets/icons/loader-icon.svg';

const Loader: FC = () => {
    return (
        <>
            {createPortal(
                (
                    <Backdrop>
                        <LoaderIcon data-test-id="loader" className={classes.loader}/>
                    </Backdrop>
                ),
                document.getElementById('loader-root') as HTMLElement
            )}
        </>
    );
};

export default Loader;
