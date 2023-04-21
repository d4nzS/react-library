import { FC, ReactNode } from 'react';

import classes from './MainContainer.module.scss';
import Navbar from '../Shared/Navbar/Navbar';

interface MainContentProps {
    children: ReactNode;
}

const MainContainer: FC<MainContentProps> = ({ children }) => {
    return (
        <div data-test-id="content" className={classes['main-container']}>
            <Navbar desktopNavbarIsShown/>
            {children}
        </div>
    );
};

export default MainContainer;
