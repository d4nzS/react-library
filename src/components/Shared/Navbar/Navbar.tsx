import { FC, MouseEvent, useLayoutEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import classNames from 'classnames';

import classes from './Navbar.module.scss';
import AppUrlsConstants from '../../../constants/urls';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { currentBreakpointSelector, mobileAndTabletNavbarIsShownSelector } from '../../../store/ui/selectors';
import Categories from '../../../models/category';
import Books from '../../../models/books';
import { uiActions } from '../../../store/ui/slice';
import { stopClickPropagationHandler } from '../../../utils/prevent-handlers';
import { logout } from '../../../utils/auth';
import { ReactComponent as ToggleIcon } from '../../../assets/icons/toggle-icon.svg';
import AsyncWrapper from '../AsyncWrapper/AsyncWrapper';

interface NavbarProps {
    desktopNavbarIsShown: boolean;
}

const Navbar: FC<NavbarProps> = ({ desktopNavbarIsShown }) => {
    const navigate = useNavigate();
    const { pathname: currentUrl } = useLocation();
    const bookShowcaseIsActive = currentUrl.startsWith(AppUrlsConstants.BOOKS);
    const dispatch = useAppDispatch();
    const currentBreakpoint = useAppSelector(currentBreakpointSelector);
    const mobileAndTabletNavbarIsShown = useAppSelector(mobileAndTabletNavbarIsShownSelector);
    const navbarIsShown = desktopNavbarIsShown
        ? mobileAndTabletNavbarIsShown || (currentBreakpoint === 'xxl')
        : mobileAndTabletNavbarIsShown && currentBreakpoint !== 'xxl';
    const [bookShowcaseIsOpen, setBookShowcaseIsOpen] = useState<boolean>(bookShowcaseIsActive);
    const { books, categories } = useRouteLoaderData('root') as {
        books: Promise<Books>,
        categories: Promise<Categories>
    };

    useLayoutEffect(() => {
        setBookShowcaseIsOpen(bookShowcaseIsActive);
    }, [bookShowcaseIsActive]);

    const hideNavbarHandler = (): void => {
        dispatch(uiActions.hideMobileAndTabletNavbar());
    };

    const linkToBookShowcaseHandler = (event: MouseEvent): void => {
        event.preventDefault();

        if (bookShowcaseIsActive) {
            setBookShowcaseIsOpen(prevState => !prevState);

            return;
        }

        hideNavbarHandler();
        navigate(AppUrlsConstants.BOOKS_ALL);
    };

    const linkToBookShowcaseCategoryHandler = (event: MouseEvent, linkUrl: string): void => {
        event.preventDefault();

        hideNavbarHandler();

        if (currentUrl !== linkUrl) {
            navigate(linkUrl);
        }
    };

    const logoutHandler = (): void => {
        hideNavbarHandler();
        logout();
        navigate(AppUrlsConstants.AUTH);
    };

    return (
        <nav
            data-test-id="burger-navigation"
            className={classNames(
                classes.navbar,
                { [classes.navbar_invisible]: !navbarIsShown }
            )}
            onClick={stopClickPropagationHandler}
        >
            <ul className={classes.navbar__list}>
                <li className={classes.navbar__item}>
                    <NavLink
                        data-test-id={currentBreakpoint === 'xxl' ? 'navigation-showcase' : 'burger-showcase'}
                        to={AppUrlsConstants.BOOKS}
                        className={({ isActive }) => classNames(
                            classes.navbar__link,
                            { [classes.navbar__link_active]: isActive || bookShowcaseIsOpen }
                        )}
                        onClick={linkToBookShowcaseHandler}
                    >
                        <span>Витрина книг</span>
                        {bookShowcaseIsActive && (
                            <button type="button">
                                <ToggleIcon className={classNames(
                                    classes.navbar__icon,
                                    { [classes.navbar__icon_reversed]: bookShowcaseIsOpen }
                                )}/>
                            </button>
                        )}
                    </NavLink>
                    <AsyncWrapper promise={categories}>
                        {(loadedCategories: Categories) => (
                            <ul className={classNames(
                                classes.navbar__sublist,
                                { [classes.navbar__sublist_invisible]: !bookShowcaseIsOpen }
                            )}>
                                <li className={classNames(classes.navbar__subitem, classes.navbar__subitem_type_all)}>
                                    <NavLink
                                        data-test-id={currentBreakpoint === 'xxl' ? 'navigation-books' : 'burger-books'}
                                        to={AppUrlsConstants.BOOKS_ALL}
                                        className={({ isActive }) => classNames({ [classes.navbar__sublink_active]: isActive })}
                                        onClick={(event: MouseEvent) => linkToBookShowcaseCategoryHandler(event, '/books/all')}
                                    >
                                        <span className={classes['navbar__span-category']}>
                                            Все книги
                                        </span>
                                    </NavLink>
                                </li>
                                {loadedCategories.map(category => (
                                    <li
                                        key={category.path}
                                        className={classNames(classes.navbar__subitem)}
                                    >
                                        <NavLink
                                            to={`${AppUrlsConstants.BOOKS}/${category.path}`}
                                            className={({ isActive }) => classNames({ [classes.navbar__sublink_active]: isActive })}
                                            onClick={(event: MouseEvent) => linkToBookShowcaseCategoryHandler(event, `${AppUrlsConstants.BOOKS}/${category.path}`)}
                                        >
                                            <span
                                                data-test-id={currentBreakpoint === 'xxl'
                                                    ? `navigation-${category.path}`
                                                    : `burger-${category.path}`}
                                                className={classNames(
                                                    classes['navbar__span-category'],
                                                    classes['navbar__span-category_one-word-in-one-line']
                                                )}
                                            >
                                                {category.name}
                                            </span>
                                            <AsyncWrapper promise={books}>
                                                {(loadedBooks: Books) => (
                                                    <span
                                                        data-test-id={currentBreakpoint === 'xxl'
                                                            ? `navigation-book-count-for-${category.path}`
                                                            : `burger-book-count-for-${category.path}`}
                                                        className={classes['navbar__span-amount']}
                                                    >
                                                        {loadedBooks.filter(book => book.categories?.includes(category.name)).length}
                                                    </span>
                                                )}
                                            </AsyncWrapper>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </AsyncWrapper>
                </li>
                <li className={classes.navbar__item}>
                    <NavLink
                        data-test-id={currentBreakpoint === 'xxl' ? 'navigation-terms' : 'burger-terms'}
                        to={AppUrlsConstants.TERMS}
                        className={({ isActive }) => classNames(
                            classes.navbar__link,
                            { [classes.navbar__link_active]: isActive }
                        )}
                        onClick={hideNavbarHandler}
                    >
                        Правила пользования
                    </NavLink>
                </li>
                <li className={classNames(classes.navbar__item, classes.navbar__item_type_contract)}>
                    <NavLink
                        data-test-id={currentBreakpoint === 'xxl' ? 'navigation-contract' : 'burger-contract'}
                        to={AppUrlsConstants.CONTRACT}
                        className={({ isActive }) => classNames(
                            classes.navbar__link,
                            { [classes.navbar__link_active]: isActive }
                        )}
                        onClick={hideNavbarHandler}
                    >
                        Договор оферты
                    </NavLink>
                </li>
                <div className={classes['navbar__additional-items-container']}>
                    <hr className={classes['navbar__horizontal-line']}/>
                    <li
                        data-test-id="profile-button"
                        className={classes.navbar__item}
                    >
                        <NavLink
                            to={AppUrlsConstants.PROFILE}
                            className={({ isActive }) => classNames(
                                classes.navbar__link,
                                { [classes.navbar__link_active]: isActive }
                            )}
                            onClick={hideNavbarHandler}
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={classNames(
                        classes.navbar__item,
                        classes.navbar__item_type_exit
                    )}>
                        <button data-test-id="exit-button" onClick={logoutHandler}>
                            Выход
                        </button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
