import { useState } from 'react';

const useModal = (isShown?: boolean) => {
    const [modalIsShown, setModalIsShown] = useState<boolean>(!!isShown);

    const showModalHandler = (): void => {
        setModalIsShown(true);
    };

    const hideModalHandler = (): void => {
        setModalIsShown(false);
    };

    return {
        modalIsShown,
        showModalHandler,
        hideModalHandler
    };
};

export default useModal;
