import { FC, ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';

import classes from './Button.module.scss';

export type BtnStyleType = 'default' | 'active' | 'primary' | 'secondary';

interface ButtonProps {
    dataTestId?: string;
    type?: 'submit' | 'button';
    styleType: BtnStyleType;
    disabled?: boolean;
    className: string;
    onClick?: (event?: MouseEvent) => void;
    children: string | ReactNode;
}

const Button: FC<ButtonProps> = ({
                                     dataTestId,
                                     type = 'button',
                                     styleType,
                                     disabled,
                                     className,
                                     onClick,
                                     children
                                 }) => {
    const clickHandler = (event: MouseEvent) => {
        event.stopPropagation();

        onClick?.();
    };

    return (
        <button
            data-test-id={dataTestId}
            type={type}
            disabled={disabled}
            className={classNames(
                classes.button,
                classes[`button_${styleType}`],
                className
            )}
            onClick={clickHandler}
        >
            {children}
        </button>
    );
};

export default Button;
