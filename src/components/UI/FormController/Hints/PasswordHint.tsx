import { FC } from 'react';
import classNames from 'classnames';

import hintClasses from './Hint.module.scss';

interface PasswordHintProps {
    hasMinLength: boolean;
    hasCapitalLetter: boolean;
    hasNumber: boolean;
}

const PasswordHint: FC<PasswordHintProps> = ({
                                                 hasMinLength,
                                                 hasCapitalLetter,
                                                 hasNumber
                                             }) => {
    return (
        <>
            Пароль <span className={classNames({ [hintClasses.hint__error]: !hasMinLength })}>
                не менее 8 символов
            </span>, <span className={classNames({ [hintClasses.hint__error]: !hasCapitalLetter })}>
                с заглавной буквой
            </span> и <span className={classNames({ [hintClasses.hint__error]: !hasNumber })}>
                цифрой
            </span>
        </>
    );
};

export default PasswordHint;
