import { FC } from 'react';
import classNames from 'classnames';

import hintClasses from './Hint.module.scss';

interface UsernameHintProps {
    hasLatinLetter: boolean;
    hasNumber: boolean;
}

const UsernameHint: FC<UsernameHintProps> = ({
                                                 hasLatinLetter,
                                                 hasNumber
                                             }) => {
    return (
        <>
            Используйте для логина <span className={classNames({[hintClasses.hint__error]: !hasLatinLetter})}>
                латинский алфавит
            </span> и <span className={classNames({[hintClasses.hint__error]: !hasNumber})}>
                цифры
            </span>
        </>
    );
};

export default UsernameHint;
