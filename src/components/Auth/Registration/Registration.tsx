import {FC, useRef, useState} from 'react';
import {Form, useActionData, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import classes from './Registration.module.scss';
import AppUrlsConstants from '../../../constants/urls';
import RegistrationStepsConstants from './constants';
import AuthModal from '../../UI/AuthModal/AuthModal';
import AuthFormWrapper from '../../UI/AuthFormWrapper/AuthFormWrapper';
import {preventEnterFormSubmitHandler} from '../../../utils/prevent-handlers';
import FirstRegistrationStep from './RegistrationSteps/FirstRegistrationStep';
import SecondRegistrationSteps from './RegistrationSteps/SecondRegistrationSteps';
import ThirdRegistrationSteps from './RegistrationSteps/ThirdRegistrationStep';
import AuthResponse from '../../UI/AuthResponse/AuthResponse';

const Registration: FC = () => {
    const data = useActionData() as { isSucceed?: true, errStatus?: number };
    const is400Error = data?.errStatus === 400;
    const isNot400Error = data?.errStatus && data.errStatus !== 400;
    const navigate = useNavigate();
    const [registrationStepIndex, setRegistrationStepIndex] = useState<RegistrationStepsConstants>(RegistrationStepsConstants.FIRST_REGISTRATION_STEP_INDEX);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const submitFormHandler = (): void => {
        submitBtnRef.current!.click();
        setRegistrationStepIndex(RegistrationStepsConstants.FIRST_REGISTRATION_STEP_INDEX);
    };

    const linkAfterResponseHandler = (): void => {
        navigate(data?.isSucceed ? AppUrlsConstants.AUTH : '');
    };

    return (
        <AuthModal
            isResponse={!!data}
            className={classNames(
                classes.registration,
                { [classes['registration_type_success-response']]: data?.isSucceed },
                { [classes['registration_type_400-error-response']]: is400Error },
                { [classes['registration_type_not-400-error-response']]: isNot400Error }
            )}
        >
            {!data && (
                <AuthFormWrapper
                    authType="registration"
                    title="Регистрация"
                >
                    <span className={classes.registration__span}>{registrationStepIndex} шаг из 3</span>
                    <Form
                        data-test-id="register-form"
                        method="post"
                        onKeyDown={preventEnterFormSubmitHandler}
                    >
                        <FirstRegistrationStep
                            isActive={registrationStepIndex === RegistrationStepsConstants.FIRST_REGISTRATION_STEP_INDEX}
                            onComplete={() => setRegistrationStepIndex(RegistrationStepsConstants.SECOND_REGISTRATION_STEP_INDEX)}
                        />
                        <SecondRegistrationSteps
                            isActive={registrationStepIndex === RegistrationStepsConstants.SECOND_REGISTRATION_STEP_INDEX}
                            onComplete={() => setRegistrationStepIndex(RegistrationStepsConstants.THIRD_REGISTRATION_STEP_INDEX)}
                        />
                        <ThirdRegistrationSteps
                            isActive={registrationStepIndex === RegistrationStepsConstants.THIRD_REGISTRATION_STEP_INDEX}
                            onSubmit={submitFormHandler}
                        />
                        <button ref={submitBtnRef} type="submit" style={{ display: 'none' }}/>
                    </Form>
                </AuthFormWrapper>
            )}
            {data?.isSucceed && <AuthResponse
                title="Регистрация успешна"
                message="Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль"
                btnText="Вход"
                onBtnClick={linkAfterResponseHandler}
            />}
            {is400Error && <AuthResponse
                title="Данные не сохранились"
                message="Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail"
                btnText="Назад к регистрации"
                onBtnClick={linkAfterResponseHandler}
            />}
            {isNot400Error && <AuthResponse
                title="Данные не сохранились"
                message="Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз"
                btnText="Повторить"
                onBtnClick={linkAfterResponseHandler}
            />}
        </AuthModal>
    );
};

export default Registration;
