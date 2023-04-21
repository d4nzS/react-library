import { FC } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './RegistrtationSteps.module.scss';
import FormController from '../../../UI/FormController/FormController';
import { PHONE_PATTERN, EMAIL_PATTERN } from '../../../../utils/validators';
import Button from '../../../UI/Button/Button';
import PhoneHint from '../../../UI/FormController/Hints/PhoneHint';

interface ThirdRegistrationStepProps {
    isActive: boolean;
    onSubmit: () => void;
}

const ThirdRegistrationSteps: FC<ThirdRegistrationStepProps> = ({ isActive, onSubmit }) => {
    const {
        control,
        getValues,
        trigger,
        formState: { errors },
        handleSubmit
    } = useForm();

    return (
        <div className={classNames({ [classes['registration-step_invisible']]: !isActive })}>
            <FormController
                type="tel"
                name="phone"
                label="Номер телефона"
                control={control}
                rules={{
                    required: 'true',
                    pattern: PHONE_PATTERN
                }}
                validationMode="onBlur"
                trigger={trigger}
            >
                {errors.phone?.type !== 'required' && <PhoneHint
                    isPhoneNumber={errors.phone?.type !== 'pattern'}
                />}
            </FormController>
            <FormController
                type="email"
                name="email"
                label="E-mail"
                control={control}
                rules={{
                    required: true,
                    pattern: EMAIL_PATTERN
                }}
                validationMode="onBlur"
                trigger={trigger}
                hint={getValues('email')
                    ? 'Введите корректный e-mail'
                    : 'Поле не может быть пустым'
                }
            />
            <Button
                styleType="primary"
                disabled={!!(errors.phone || errors.email)}
                className={classes.form__button}
                onClick={handleSubmit(onSubmit)}
            >
                Зарегистрироваться
            </Button>
        </div>
    );
};

export default ThirdRegistrationSteps;
