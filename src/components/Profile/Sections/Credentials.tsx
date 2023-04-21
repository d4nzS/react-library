import { FC, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './Credentials.module.scss';
import sectionClasses from './Section.module.scss';
import useAppDispatch from '../../../hooks/useAppDispatch';
import FormController from '../../UI/FormController/FormController';
import {
    EMAIL_PATTERN,
    hasCapitalLetter,
    hasLatinLetter,
    hasNumber,
    PHONE_PATTERN
} from '../../../utils/validators';
import UsernameHint from '../../UI/FormController/Hints/UsernameHint';
import PasswordHint from '../../UI/FormController/Hints/PasswordHint';
import PhoneHint from '../../UI/FormController/Hints/PhoneHint';
import Button from '../../UI/Button/Button';
import { changeCredentials } from '../../../store/http/actions';

export interface CredentialsValues {
    login: string;
    password: string
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

interface CredentialsProps {
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

const Credentials: FC<CredentialsProps> = ({
                                               username,
                                               firstName,
                                               lastName,
                                               phone,
                                               email,
                                           }) => {
        const {
            control,
            trigger,
            getValues,
            handleSubmit,
            formState: { errors }
        } = useForm<CredentialsValues>({ criteriaMode: 'all' });
        const dispatch = useAppDispatch();
        const [controllersAreDisabled, setControllersAreDisabled] = useState<boolean>(true);

        const toggleEditCredentialsPermissionHandler = (): void => {
            setControllersAreDisabled(prevState => !prevState);
        };

        const onSubmitCredentialsChanges = async (data: CredentialsValues): Promise<void> => {
            setControllersAreDisabled(true);

            dispatch(changeCredentials({ ...data, username: data.login }));
        };

        return (
            <section className={sectionClasses.section}>
                <h3 className={sectionClasses.title}>Учётные данные</h3>
                <p className={classNames(
                    sectionClasses.hint,
                    classes.credentials__hint
                )}>
                    Здесь вы можете отредактировать информацию о себе
                </p>
                <form
                    data-test-id="profile-form"
                    onSubmit={handleSubmit(onSubmitCredentialsChanges)}
                >
                    <div className={classes.credentials__controllers}>
                        <FormController
                            name="login"
                            label="Логин"
                            defaultValue={username}
                            disabled={controllersAreDisabled}
                            control={control as unknown as Control}
                            rules={{
                                required: true,
                                validate: { hasLatinLetter, hasNumber }
                            }}
                            validationMode="onChange"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            hint={<UsernameHint
                                hasLatinLetter={!errors.login?.types?.hasLatinLetter}
                                hasNumber={!errors.login?.types?.hasNumber}
                            />}
                            labelIsAlwaysShown
                            className={classes.credentials__controller}
                        />
                        <FormController
                            type="password"
                            name="password"
                            label="Пароль"
                            disabled={controllersAreDisabled}
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
                            labelIsAlwaysShown
                            withCheckMark
                            className={classes.credentials__controller}
                        />
                        <FormController
                            name="firstName"
                            label="Имя"
                            defaultValue={firstName}
                            disabled={controllersAreDisabled}
                            control={control as unknown as Control}
                            validationMode="onBlur"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            labelIsAlwaysShown
                            className={classes.credentials__controller}
                        />
                        <FormController
                            name="lastName"
                            label="Фамилия"
                            defaultValue={lastName}
                            disabled={controllersAreDisabled}
                            control={control as unknown as Control}
                            validationMode="onBlur"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            labelIsAlwaysShown
                            className={classes.credentials__controller}
                        />
                        <FormController
                            type="tel"
                            name="phone"
                            label="Номер телефона"
                            defaultValue={phone}
                            disabled={controllersAreDisabled}
                            control={control as unknown as Control}
                            rules={{ pattern: PHONE_PATTERN }}
                            validationMode="onBlur"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            labelIsAlwaysShown
                            className={classes.credentials__controller}
                        >
                            <PhoneHint isPhoneNumber={errors.phone?.type !== 'pattern'}/>
                        </FormController>
                        <FormController
                            type="email"
                            name="email"
                            label="E-mail"
                            defaultValue={email}
                            disabled={controllersAreDisabled}
                            control={control as unknown as Control}
                            rules={{
                                required: true,
                                pattern: EMAIL_PATTERN
                            }}
                            validationMode="onBlur"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            hint={getValues('email')
                                ? 'Введите корректный e-mail'
                                : 'Поле не может быть пустым'
                            }
                            labelIsAlwaysShown
                            className={classes.credentials__controller}
                        />
                    </div>
                    <div className={classes.credentials__actions}>
                        <Button
                            dataTestId="edit-button"
                            styleType="secondary"
                            className={classes.credentials__button}
                            onClick={toggleEditCredentialsPermissionHandler}
                        >
                            Редактировать
                        </Button>
                        <Button
                            dataTestId="save-button"
                            type="submit"
                            styleType="primary"
                            disabled={controllersAreDisabled}
                            className={classes.credentials__button}
                        >
                            Сохранить изменения
                        </Button>
                    </div>
                </form>
            </section>
        );
    }
;

export default Credentials
