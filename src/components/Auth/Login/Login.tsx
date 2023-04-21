import { FC, useEffect } from 'react';
import { Link, useActionData, useSubmit, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './Login.module.scss';
import AppUrlsConstants from '../../../constants/urls';
import AuthModal from '../../UI/AuthModal/AuthModal';
import AuthFormWrapper from '../../UI/AuthFormWrapper/AuthFormWrapper';
import FormController from '../../UI/FormController/FormController';
import Button from '../../UI/Button/Button';
import AuthResponse from '../../UI/AuthResponse/AuthResponse';

const Login: FC = () => {
    const submit = useSubmit();
    const data = useActionData() as { errStatus?: number };
    const isNot400Error = !!(data?.errStatus && data.errStatus !== 400);
    const navigate = useNavigate();
    const {
        control,
        reset,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isNot400Error) {
            reset();
        }
    }, [isNot400Error]);

    const onSubmit = (data: FieldValues): void => {
        submit(data, {
            action: AppUrlsConstants.AUTH,
            method: 'post'
        });
    };

    const retryAuthHandler = (): void => {
        navigate('');
    };

    return (
        <AuthModal
            isResponse={isNot400Error}
            className={classNames(
                classes.login,
                { [classes.login_type_response]: isNot400Error }
            )}
        >
            {!isNot400Error && (
                <AuthFormWrapper
                    authType="auth"
                    title="Вход в личный кабинет"
                >
                    <form data-test-id="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <FormController
                            name="identifier"
                            label="Логин"
                            control={control}
                            rules={{ required: true }}
                            trigger={trigger}
                            validationMode="onBlur"
                        />
                        <FormController
                            type="password"
                            name="password"
                            label="Пароль"
                            control={control}
                            rules={{ required: true }}
                            trigger={trigger}
                            validationMode="onBlur"
                        >
                            <div style={{ marginTop: !errors.password ? '1.125rem' : '0.125rem' }}>
                                {data?.errStatus === 400 && (
                                    <>
                                        <span
                                            data-test-id="hint"
                                            className={classes.login__error}
                                        >
                                            Неверный логин или пароль!
                                        </span>
                                        <br/>
                                    </>
                                )}
                                <Link
                                    to={AppUrlsConstants.FORGOT_PASS}
                                    className={classNames(
                                        classes.login__link,
                                        { [classes['login__link_type_with-response']]: data }
                                    )}
                                >
                                    {data ? 'Восстановить?' : 'Забыли логин или пароль?'}
                                </Link>
                            </div>
                        </FormController>
                        <Button
                            type="submit"
                            styleType="primary"
                            className={classes.login__button}
                        >
                            Вход
                        </Button>
                    </form>
                </AuthFormWrapper>
            )}
            {isNot400Error && <AuthResponse
                title="Вход не выполнен"
                message="Что-то пошло не так. Попробуйте ещё раз"
                btnText="Повторить"
                onBtnClick={retryAuthHandler}
            />}
        </AuthModal>
    );
};

export default Login;
