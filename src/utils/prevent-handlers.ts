import { MouseEvent, KeyboardEvent } from 'react';

export const stopClickPropagationHandler = (event: MouseEvent): void => {
    event.stopPropagation();
};

export const preventEnterFormSubmitHandler = (event: KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};
