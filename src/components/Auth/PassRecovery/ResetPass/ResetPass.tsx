import { FC, useRef } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { Control, useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './ResetPass.module.scss';
import AppUrlsConstants from '../../../../constants/urls';
import AuthModal from '../../../UI/AuthModal/AuthModal';
import AuthFormWrapper from '../../../UI/AuthFormWrapper/AuthFormWrapper';
import { preventEnterFormSubmitHandler } from '../../../../utils/prevent-handlers';
import FormController from '../../../UI/FormController/FormController';
import { hasCapitalLetter, hasNumber } from '../../../../utils/validators';
import PasswordHint from '../../../UI/FormController/Hints/PasswordHint';
import Button from '../../../UI/Button/Button';
import AuthResponse from '../../../UI/AuthResponse/AuthResponse';

interface ResetPassFormValues {
    password: string;
    passwordConfirmation: string;
}

const ResetPass: FC = () => {
    const data = useActionData() as { isSucceed?: boolean };
    const navigate = useNavigate();
    const {
        control,
        getValues,
        trigger,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPassFormValues>({ criteriaMode: 'all' });
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const submitFormHandler = (): void => {
        submitBtnRef.current!.click();
    };

    const linkAfterResponseHandler = (): void => {
        navigate(data?.isSucceed ? AppUrlsConstants.AUTH : '');
    };

    return (
        <AuthModal className={classNames(
            classes['reset-pass'],
            { [classes['reset-pass_type_success-response']]: data?.isSucceed },
            { [classes['reset-pass_type_error-response']]: data?.isSucceed === false },
        )}>
            {!data && (
                <AuthFormWrapper
                    authType="forgot-pass"
                    title="Восстановление пароля"
                    withLink={false}
                >
                    <Form
                        data-test-id="reset-password-form"
                        method="post"
                        onKeyDown={preventEnterFormSubmitHandler}
                    >
                        <FormController
                            type="password"
                            name="password"
                            label="Новый пароль"
                            control={control as unknown as Control}
                            rules={{
                                required: true,
                                minLength: 8,
                                validate: { hasCapitalLetter, hasNumber }
                            }}
                            validationMode="onChange"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            hint={<PasswordHint
                                hasMinLength={!errors.password?.types?.minLength}
                                hasCapitalLetter={!errors.password?.types?.hasCapitalLetter}
                                hasNumber={!errors.password?.types?.hasNumber}
                            />}
                            withCheckMark
                        />
                        <FormController
                            type="password"
                            name="passwordConfirmation"
                            label="Повторите пароль"
                            control={control as unknown as Control}
                            rules={{
                                required: true,
                                validate: {
                                    passwordsAreSimilar: (value: string) => value === getValues('password')
                                }
                            }}
                            validationMode="onBlur"
                            trigger={trigger as (name: string) => Promise<boolean>}
                            hint="Пароли не совпадают"
                        />
                        <Button
                            styleType="primary"
                            disabled={!!(errors.password || errors.passwordConfirmation)}
                            className={classes['reset-pass__button']}
                            onClick={handleSubmit(submitFormHandler)}
                        >
                            Сохранить изменения
                        </Button>
                        <p className={classes['reset-pass__hint']}>
                            После сохранения войдите в библиотеку, используя новый пароль
                        </p>
                        <button ref={submitBtnRef} type="submit" style={{ display: 'none' }}/>
                    </Form>
                </AuthFormWrapper>
            )}
            {data?.isSucceed && <AuthResponse
                title="Новые данные сохранены"
                message="Зайдите в личный кабинет, используя свои логин и новый пароль"
                btnText="Вход"
                onBtnClick={linkAfterResponseHandler}
            />}
            {data?.isSucceed === false && <AuthResponse
                title="Данные не сохранились"
                message="Что-то пошло не так. Попробуйте ещё раз"
                btnText="Повторить"
                onBtnClick={linkAfterResponseHandler}
            />}
        </AuthModal>
    );
};

export default ResetPass;
