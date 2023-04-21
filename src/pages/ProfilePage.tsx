import { FC } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import User from '../models/user';
import Categories from '../models/category';
import Books from '../models/books';
import AsyncWrapper from '../components/Shared/AsyncWrapper/AsyncWrapper';
import ProfileContainer from '../components/Profile/ProfileContainer';
import Overview from '../components/Profile/Sections/Overview';
import Credentials from '../components/Profile/Sections/Credentials';
import Booking from '../components/Profile/Sections/Booking';
import Delivery from '../components/Profile/Sections/Delivery';
import History from '../components/Profile/Sections/History';

const ProfilePage: FC = () => {
    const {
        currentUser,
        books,
        categories
    } = useRouteLoaderData('root') as {
        currentUser: Promise<User>,
        books: Promise<Books>,
        categories: Promise<Categories>
    };

    return (
        <>
            <ProfileContainer>
                <AsyncWrapper promise={currentUser}>
                    {currentUser => (
                        <main>
                            <Overview
                                firstName={currentUser.firstName}
                                lastName={currentUser.lastName}
                                avatar={currentUser.avatar}
                            />
                            <Credentials {...currentUser}
                            />
                            <Booking booking={currentUser.booking}/>
                            <Delivery delivery={currentUser.delivery}/>
                            <History
                                history={currentUser.history}
                                comments={currentUser.comments}
                            />
                        </main>
                    )}
                </AsyncWrapper>
            </ProfileContainer>
            <AsyncWrapper promise={Promise.all([currentUser, books, categories])} isMainLoader/>
        </>
    );
};

export default ProfilePage;
