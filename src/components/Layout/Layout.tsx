import { FC, ReactNode } from 'react';

import classes from './Layout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={classes.layout}>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;
