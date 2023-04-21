import { FC } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './RegistrtationSteps.module.scss';
import FormController from '../../../UI/FormController/FormController';
import Button from '../../../UI/Button/Button';

interface SecondRegistrationStepProps {
    isActive: boolean;
    onComplete: () => void;
}
const SecondRegistrationSteps: FC<SecondRegistrationStepProps> = ({ isActive, onComplete }) => {
    const {
        control,
        trigger,
        formState: { errors },
        handleSubmit
    } = useForm();

    return (
        <div className={classNames({ [classes['registration-step_invisible']]: !isActive })}>
            <FormController
                name="firstName"
                label="Имя"
                control={control}
                rules={{ required: true }}
                validationMode="onBlur"
                trigger={trigger}
            />
            <FormController
                name="lastName"
                label="Фамилия"
                control={control}
                rules={{ required: true }}
                validationMode="onBlur"
                trigger={trigger}
            />
            <Button
                styleType="primary"
                disabled={!!(errors.firstName || errors.lastName)}
                className={classes.form__button}
                onClick={handleSubmit(onComplete)}
            >
                Последний шаг
            </Button>
        </div>
    );
};

export default SecondRegistrationSteps;
