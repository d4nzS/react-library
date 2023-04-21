import { FC } from 'react';
import { Control, useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './RegistrtationSteps.module.scss';
import FormController from '../../../UI/FormController/FormController';
import { hasLatinLetter, hasNumber, hasCapitalLetter } from '../../../../utils/validators';
import Button from '../../../UI/Button/Button';
import PasswordHint from '../../../UI/FormController/Hints/PasswordHint';
import UsernameHint from '../../../UI/FormController/Hints/UsernameHint';

interface FirstStepFormValues {
    username: string;
    password: string;
}

interface FirstRegistrationStepProps {
    isActive: boolean;
    onComplete: () => void;
}

const FirstRegistrationStep: FC<FirstRegistrationStepProps> = ({ isActive, onComplete }) => {
    const {
        control,
        formState: { errors },
        trigger,
        handleSubmit
    } = useForm<FirstStepFormValues>({ criteriaMode: 'all' });

    return (
        <div className={classNames({ [classes['registration-step_invisible']]: !isActive })}>
            <FormController
                name="username"
                label="Придумайте логин для входа"
                control={control as unknown as Control}
                rules={{
                    required: true,
                    validate: { hasLatinLetter, hasNumber }
                }}
                validationMode="onChange"
                trigger={trigger as (name: string) => Promise<boolean>}
                hint={<UsernameHint
                    hasLatinLetter={!errors.username?.types?.hasLatinLetter}
                    hasNumber={!errors.username?.types?.hasNumber}
                />}
            />
            <FormController
                type="password"
                name="password"
                label="Пароль"
                control={control as unknown as Control}
                rules={{
                    required: true,
                    minLength: 8,
                    validate: { hasCapitalLetter, hasNumber }
                }}
                trigger={trigger as (name: string) => Promise<boolean>}
                validationMode="onChange"
                hint={<PasswordHint
                    hasMinLength={!errors.password?.types?.minLength}
                    hasCapitalLetter={!errors.password?.types?.hasCapitalLetter}
                    hasNumber={!errors.password?.types?.hasNumber}
                />}
                withCheckMark
            />
            <Button
                styleType="primary"
                disabled={!!(errors.password || errors.username)}
                className={classNames(
                    classes.form__button,
                    classes.form__button_mode_onchange
                )}
                onClick={handleSubmit(onComplete)}
            >
                Следующий шаг
            </Button>
        </div>
    );
};

export default FirstRegistrationStep;
