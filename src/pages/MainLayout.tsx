import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import MainContainer from '../components/Main/MainContainer';

const MainLayout: FC = () => {
    return (
        <MainContainer>
            <Outlet/>
        </MainContainer>
    );
};

export default MainLayout;
