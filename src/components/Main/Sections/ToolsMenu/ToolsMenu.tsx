import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import classNames from 'classnames';

import classes from './ToolsMenu.module.scss';
import useAppSelector from '../../../../hooks/useAppSelector';
import {
    booksDisplayTypeSelector,
    booksSortByRatingIsInDescendingOrderSelector,
    currentBreakpointSelector
} from '../../../../store/ui/selectors';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { BooksDisplayType, uiActions } from '../../../../store/ui/slice';
import Button from '../../../UI/Button/Button';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search-icon.svg';
import { ReactComponent as CrossIcon } from '../../../../assets/icons/cross-icon.svg';
import { ReactComponent as RatingIcon } from '../../../../assets/icons/rating-icon.svg';
import { ReactComponent as WindowIcon } from '../../../../assets/icons/window-icon.svg';
import { ReactComponent as ListIcon } from '../../../../assets/icons/list-icon.svg';

const ToolsMenu: FC = () => {
    const currentBreakpoint = useAppSelector(currentBreakpointSelector);
    const booksDisplayType = useAppSelector(booksDisplayTypeSelector);
    const booksSortByRatingIsInDescendingOrder = useAppSelector(booksSortByRatingIsInDescendingOrderSelector);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputText, setText] = useState<string>('');
    const [inputIsShown, setInputIsShown] = useState<boolean>(false);
    const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

    useEffect(() => {
        const newInputIsShown = currentBreakpoint !== 'xs';
        setInputIsShown(newInputIsShown);
    }, [currentBreakpoint]);

    useEffect(() => {
       return () => {
           dispatch(uiActions.changeBooksSearchSubstring(''));
       };
    }, []);

    const toggleShowInputHandler = (isShown: boolean): void => {
        setInputIsShown(isShown);
    };

    const clickSearchBtnHandler = () => {
        toggleShowInputHandler(true);

        setTimeout(() => inputRef.current!.focus());
    };

    const toggleInputFocusHandler = (isFocused: boolean): void => {
        setInputIsFocused(isFocused);
    };

    const changeInputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const searchText = event.target.value;

        setText(searchText);
        dispatch(uiActions.changeBooksSearchSubstring(searchText.toLowerCase()));
    };

    const changeSorting = (): void => {
        dispatch(uiActions.changeBooksSorting());
    };

    const changeDisplay = (type: BooksDisplayType): void => {
        dispatch(uiActions.changeBooksDisplayType(type));
    };

    const mainBtnClasses = classNames(
        classes['tools-menu__button'],
        { [classes['tools-menu__button_invisible']]: inputIsShown && (currentBreakpoint === 'xs') }
    );

    return (
        <section className={classes['tools-menu']}>
            <div className={classNames(
                classes['tools-menu__input-container'],
                { [classes['tools-menu__input-container_invisible']]: !inputIsShown }
            )}>
                <Button
                    dataTestId="button-search-open"
                    styleType="default"
                    className={classNames(mainBtnClasses, classes['tools-menu__button_type_search'])}
                    onClick={clickSearchBtnHandler}
                >
                    <SearchIcon className={classNames(
                        classes['tools-menu__icon'],
                        {[classes['tools-menu__icon_active']]: inputIsFocused }
                    )}/>
                </Button>
                <input
                    data-test-id="input-search"
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск книги или автора…"
                    className={
                    classNames(
                        classes['tools-menu__input'],
                        { [classes['tools-menu__input_invisible']]: !inputIsShown }
                    )}
                    onFocus={() => toggleInputFocusHandler(true)}
                    onBlur={() => toggleInputFocusHandler(false)}
                    value={inputText}
                    onChange={changeInputHandler}
                />
                <button
                    data-test-id="button-search-close"
                    type="button"
                    className={classNames(
                        classes['tools-menu__button'],
                        { [classes['tools-menu__button_invisible']]: !inputIsShown || (currentBreakpoint != 'xs') },
                    )}
                    onClick={() => toggleShowInputHandler(false)}
                >
                    <CrossIcon className={classes['tools-menu__icon']}/>
                </button>
            </div>
            <Button
                dataTestId="sort-rating-button"
                styleType="default"
                className={classNames(mainBtnClasses, classes['tools-menu__button_type_rating'])}
                onClick={changeSorting}
            >
                <RatingIcon className={classNames(
                    classes['tools-menu__icon'],
                    classes['tools-menu__icon_type_rating'],
                    { [classes['tools-menu__icon_reversed']]: !booksSortByRatingIsInDescendingOrder }
                )}/>
                <span className={classes['tools-menu__text']}>По рейтингу</span>
            </Button>
            <Button
                data-test-id="button-menu-view-window"
                styleType={booksDisplayType === 'window' ? 'active' : 'default'}
                className={classNames(mainBtnClasses, classes['tools-menu__button_type_window-switcher'])}
                onClick={() => changeDisplay('window')}
            >
                <WindowIcon className={classNames(
                    classes['tools-menu__icon'],
                    classes['tools-menu__icon_type_switcher']
                )}/>
            </Button>
            <Button
                data-test-id="button-menu-view-list"
                styleType={booksDisplayType === 'list' ? 'active' : 'default'}
                className={mainBtnClasses}
                onClick={() => changeDisplay('list')}
            >
                <ListIcon className={classNames(
                    classes['tools-menu__icon'],
                    classes['tools-menu__icon_type_switcher']
                )}/>
            </Button>
        </section>
    );
};

export default ToolsMenu;
