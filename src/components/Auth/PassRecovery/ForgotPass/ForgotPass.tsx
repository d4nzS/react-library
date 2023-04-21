import { FC, useRef } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import classes from './ForgotPass.module.scss';
import AuthModal from '../../../UI/AuthModal/AuthModal';
import AppUrlsConstants from '../../../../constants/urls';
import { ReactComponent as ArrowIcon } from '../../../../assets/icons/arrow-icon.svg';
import AuthFormWrapper from '../../../UI/AuthFormWrapper/AuthFormWrapper';
import { preventEnterFormSubmitHandler } from '../../../../utils/prevent-handlers';
import FormController from '../../../UI/FormController/FormController';
import { EMAIL_PATTERN } from '../../../../utils/validators';
import Button from '../../../UI/Button/Button';
import AuthResponse from '../../../UI/AuthResponse/AuthResponse';

const ForgotPass: FC = () => {
    const data = useActionData() as { isSucceed?: boolean };
    const { control, trigger, handleSubmit } = useForm();
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const submitFormHandler = (): void => {
        submitBtnRef.current!.click();
    };

    return (
        <AuthModal
            isResponse={data?.isSucceed}
            className={classNames(
                classes['forgot-pass'],
                { [classes['forgot-pass_type_response']]: data?.isSucceed }
            )}
        >
            {!data?.isSucceed && (
                <div className={classes['forgot-pass__header']}>
                    <Link to={AppUrlsConstants.AUTH} className={classes['forgot-pass__link']}>
                        <ArrowIcon className={classes['forgot-pass__icon']}/>
                        Вход в личный кабинет
                    </Link>
                </div>
            )}
            {!data?.isSucceed && (
                <AuthFormWrapper
                    authType="forgot-pass"
                    title="Восстановление пароля"
                >
                    <Form
                        data-test-id="send-email-form"
                        method="post"
                        onKeyDown={preventEnterFormSubmitHandler}
                    >
                        <FormController
                            type="email"
                            name="email"
                            label="Email"
                            control={control}
                            rules={{
                                required: true,
                                pattern: EMAIL_PATTERN
                            }}
                            validationMode="onBlur"
                            trigger={trigger}
                            hint="Введите корректный e-mail"
                        >
                            <div className={classes['forgot-pass__hint']}>
                                <span data-test-id="hint" className={classes['forgot-pass__error']}>
                                    {data?.isSucceed === false && 'error'}
                                </span>
                                На это email будет отправлено письмо с инструкциями по восстановлению пароля
                            </div>
                        </FormController>
                        <Button
                            styleType="primary"
                            className={classes['forgot-pass__button']}
                            onClick={handleSubmit(submitFormHandler)}
                        >
                            Восстановить
                        </Button>
                        <button ref={submitBtnRef} type="submit" style={{ display: 'none' }}/>
                    </Form>
                </AuthFormWrapper>
            )}
            {data?.isSucceed && <AuthResponse
                title="Письмо выслано"
                message="Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля"
            />}
        </AuthModal>
    );
};

export default ForgotPass;
