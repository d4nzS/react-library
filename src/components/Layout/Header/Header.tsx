import { FC, MouseEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';

import classes from './Header.module.scss';
import User from '../../../models/user';
import AppUrlsConstants from '../../../constants/urls';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { mobileAndTabletNavbarIsShownSelector, currentBreakpointSelector } from '../../../store/ui/selectors';
import { stopClickPropagationHandler } from '../../../utils/prevent-handlers';
import { logout } from '../../../utils/auth';
import { uiActions } from '../../../store/ui/slice';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross-icon.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/list-icon.svg';
import logoImg from '../../../assets/images/logo.svg';
import defaultAvatarImg from '../../../assets/images/default-avatar.png';
import AsyncWrapper from '../../Shared/AsyncWrapper/AsyncWrapper';

const Header: FC = () => {
    const { currentUser } = useRouteLoaderData('root') as { currentUser: Promise<User> };
    const navigate = useNavigate();
    const { pathname: currentUrl } = useLocation();
    const isProfilePage = currentUrl.startsWith(AppUrlsConstants.PROFILE);
    const dispatch = useAppDispatch();
    const mobileAndTabletNavbarIsShown = useAppSelector(mobileAndTabletNavbarIsShownSelector);
    const currentBreakpoint = useAppSelector(currentBreakpointSelector);
    const [headerNavIsShown, setHeaderNavIsShown] = useState<boolean>(false);

    useEffect(() => {
        const clickBodyHandler = () => {
            setHeaderNavIsShown(false);
        };

        document.body.addEventListener('click', clickBodyHandler);

        return () => {
            document.body.removeEventListener('click', clickBodyHandler);
        };
    }, []);

    const toggleNavbarVisionHandler = (event: MouseEvent): void => {
        stopClickPropagationHandler(event);

        dispatch(uiActions.switchMobileAndTabletNavbarVision());
    };

    const toggleHeaderNavVisionHandler = (event: MouseEvent): void => {
        stopClickPropagationHandler(event);

        setHeaderNavIsShown(prevState => !prevState);
    };

    const logoutHandler = (): void => {
        logout();
        navigate(AppUrlsConstants.AUTH);
    };

    return (
        <header className={classes.header}>
            <Link to={AppUrlsConstants.BOOKS_ALL}>
                <img src={logoImg} alt="Logo" className={classes.header__logo}/>
            </Link>
            <button
                data-test-id="button-burger"
                className={classes.header__button}
                onClick={toggleNavbarVisionHandler}
            >
                {mobileAndTabletNavbarIsShown
                    ? <CrossIcon className={classes.header__icon}/>
                    : <MenuIcon className={classes.header__icon}/>}
            </button>
            <h1 className={classes.header__title}>
                {isProfilePage && 'Личный кабинет'}
                {!isProfilePage && 'Библиотека'}
            </h1>
            <AsyncWrapper promise={currentUser}>
                {(currentUser: User) => (
                    <div
                        className={classes['header__user-info']}
                        onClick={toggleHeaderNavVisionHandler}
                    >
                        <span>Привет, {currentUser.firstName}!</span>
                        <img
                            src={currentUser.avatar ?? defaultAvatarImg}
                            alt="Avatar"
                            className={classes.header__avatar}
                        />
                    </div>
                )}
            </AsyncWrapper>
            {headerNavIsShown && currentBreakpoint === 'xxl' && (
                <nav
                    className={classes.header__nav}
                    onClick={stopClickPropagationHandler}
                >
                    <Link
                        data-test-id="main-page"
                        to={AppUrlsConstants.PROFILE}
                        onClick={toggleHeaderNavVisionHandler}
                    >
                        Профиль
                    </Link>
                    <button onClick={logoutHandler}>Выход</button>
                </nav>
            )}
        </header>
    );
};

export default Header;
