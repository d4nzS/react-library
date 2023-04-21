import { FC, ReactNode } from 'react';

import classes from './ProfileContainer.module.scss';
import Navbar from '../Shared/Navbar/Navbar';

interface ProfileContainerProps {
    children: ReactNode;
}

const ProfileContainer: FC<ProfileContainerProps> = ({ children }) => {

    return (
        <div className={classes['profile-container']}>
            <Navbar desktopNavbarIsShown={false}/>
            {children}
        </div>
    );
};

export default ProfileContainer;
