import { FC } from 'react';
import classNames from 'classnames';

import classes from './ExpiredCard.module.scss';
import cardClasses from '../Card.module.scss';

interface ExpiredCardProps {
    message: string;
    hint: string;
}

const ExpiredCard: FC<ExpiredCardProps> = ({ message, hint }) => {
    return (
        <div
            data-test-id="expired"
            className={classNames(
                cardClasses.card,
                classes['expired-card']
            )}
        >
            {message}
            <p className={classes['expired-card__hint']}>
                {hint}
            </p>
        </div>
    );
};

export default ExpiredCard;
