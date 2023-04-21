import { useEffect, useState, ReactNode } from 'react';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { httpActions } from '../../../store/http/slice';
import Loader from '../../UI/Loader/Loader';

interface AsyncWrapperProps<T> {
    promise: Promise<T>;
    isMainLoader?: boolean;
    errorElement?: ReactNode;
    children?: (loadedEntity: T) => ReactNode;
}

const AsyncWrapper = <T, >({
                               promise,
                               isMainLoader,
                               errorElement,
                               children
                           }: AsyncWrapperProps<T>): JSX.Element => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [loadedEntity, setLoadedEntity] = useState<T>();

    useEffect(() => {
        (async () => {
            try {
                setLoadedEntity(await promise);
            } catch {
                dispatch(httpActions.setResponse({
                    isSucceed: false,
                    message: 'Что-то пошло не так. Обновите страницу через некоторое время.'
                }));
            }

            setIsLoaded(true);
        })();
    }, [isMainLoader, promise]);

    return (
        <>
            {isLoaded && loadedEntity && children && children(loadedEntity)}
            {!isLoaded && isMainLoader && <Loader/>}
            {isLoaded && !loadedEntity && errorElement}
        </>
    );
};

export default AsyncWrapper;
