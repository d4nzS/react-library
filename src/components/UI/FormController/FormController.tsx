import { FC, useState, ReactNode, ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import classes from './FormController.module.scss';
import { ReactComponent as HiddenPasswordIcon } from '../../../assets/icons/hidden-password-icon.svg';
import { ReactComponent as ShownPasswordIcon } from '../../../assets/icons/shown-password-icon.svg';
import { ReactComponent as CheckMarkIcon } from '../../../assets/icons/check-mark-icon.svg';

interface FormControllerProps {
    type?: string;
    name: string;
    label: string;
    defaultValue?: string;
    disabled?: boolean;
    control: Control<Record<string, any>>;
    rules?: Record<string, unknown>;
    validationMode: 'onBlur' | 'onChange';
    trigger: (name: string) => Promise<boolean>;
    hint?: ReactNode;
    labelIsAlwaysShown?: boolean;
    withCheckMark?: boolean;
    className?: string;
    children?: ReactNode;
}

const FormController: FC<FormControllerProps> = ({
                                                     type = 'text',
                                                     name,
                                                     label,
                                                     defaultValue,
                                                     disabled,
                                                     control,
                                                     rules,
                                                     hint,
                                                     validationMode,
                                                     trigger,
                                                     labelIsAlwaysShown,
                                                     withCheckMark,
                                                     className,
                                                     children
                                                 }) => {
    const {
        field: { onBlur, onChange, value },
        fieldState: { invalid }
    } = useController({
        name,
        rules,
        control,
        defaultValue
    });
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);

    const interactionHandler = (): void => {
        setIsFocused(prevState => !prevState);
    };

    const blurHandler = async (): Promise<void> => {
        onBlur();
        interactionHandler();

        await trigger(name);
    };

    const changeHandler = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        onChange(event.target.value);

        if (invalid || validationMode === 'onChange') {
            await trigger(name);
        }
    }

    const togglePasswordVisibilityHandler = (): void => {
        setPasswordIsShown(prevState => !prevState);
    };

    return (
        <div className={classNames(
            classes['form-controller'],
            {
                [classes['form-controller_opened']]: labelIsAlwaysShown
                    ? labelIsAlwaysShown && value || isFocused
                    : value || isFocused
            },
            { [classes['form-controller_mode_onchange']]: validationMode === 'onChange' },
            { [classes['form-controller_invalid']]: invalid },
            className
        )}>
            <div style={{ flexGrow: 1 }}>
                <label
                    htmlFor={name}
                    className={classNames(
                        classes['form-controller__label'],
                        {
                            [classes['form-controller__label_invisible']]: labelIsAlwaysShown
                                ? !(labelIsAlwaysShown && value || isFocused)
                                : !(value || isFocused)
                        }
                    )}
                >
                    {label}
                </label>
                {type !== 'tel' && <input
                    type={type === 'password' && !passwordIsShown ? type : 'text'}
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    placeholder={!isFocused ? label : undefined}
                    className={classes['form-controller__input']}
                    onChange={changeHandler}
                    onFocus={interactionHandler}
                    onBlur={blurHandler}
                />}
                {type === 'tel' && <InputMask
                    type="tel"
                    id={name}
                    name={name}
                    mask="+375 (99) 999-99-99"
                    maskChar="x"
                    defaultValue={defaultValue}
                    disabled={disabled}
                    placeholder={!isFocused ? label : undefined}
                    className={classes['form-controller__input']}
                    onChange={changeHandler}
                    onFocus={interactionHandler}
                    onBlur={blurHandler}
                />}
            </div>
            <div className={classes['form-controller__input-state']}>
                {withCheckMark && value && !invalid && <CheckMarkIcon data-test-id="checkmark"/>}
                {type === 'password' && value && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibilityHandler}
                        className={classes['form-controller__button']}
                    >
                        {!passwordIsShown && <HiddenPasswordIcon data-test-id="eye-closed"/>}
                        {passwordIsShown && <ShownPasswordIcon data-test-id="eye-opened"/>}
                    </button>
                )}
            </div>
            <div className={classes['form-controller__info']}>
                {validationMode === 'onBlur' && hint && invalid && (
                    <p
                        data-test-id="hint"
                        className={classNames(
                            classes['form-controller__hint'],
                            classes['form-controller__hint_type_error'],
                        )}
                    >
                        {value && hint}
                        {!value && 'Поле не может быть пустым'}
                    </p>
                )}
                {validationMode === 'onBlur' && !hint && invalid && !value && (
                    <p
                        data-test-id="hint"
                        className={classNames(
                            classes['form-controller__hint'],
                            classes['form-controller__hint_type_error']
                        )}
                    >
                        Поле не может быть пустым
                    </p>
                )}
                {validationMode === 'onChange' && (
                    <p
                        data-test-id="hint"
                        className={classNames(
                            classes['form-controller__hint'],
                            { [classes['form-controller__hint_type_error']]: invalid && !isFocused }
                        )}
                    >
                        {!(value === undefined && invalid) && hint}
                        {value === undefined && invalid && (
                            <span className={classes['form-controller__hint_type_error']}>
                                Поле не может быть пустым
                            </span>
                        )}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
};

export default FormController;
