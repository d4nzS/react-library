import { FC } from 'react';
import classNames from 'classnames';

import hintClasses from './Hint.module.scss';

interface PhoneHintProps {
    isPhoneNumber: boolean;
}

const PhoneHint: FC<PhoneHintProps> = ({ isPhoneNumber }) => {
    return (
        <p
            data-test-id="hint"
            className={classNames(
                hintClasses.hint,
                { [hintClasses.hint__error]: !isPhoneNumber }
            )}
        >
            В формате +375 (xx) xxx-xx-xx
        </p>
    );
};

export default PhoneHint;
