import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import classes from './EmptyCard.module.scss';
import cardClasses from '../Card.module.scss';

interface EmptyCardProps {
    children: ReactNode;
}

const EmptyCard: FC<EmptyCardProps> = ({ children }) => {
    return (
        <div
            data-test-id="empty-blue-card"
            className={classNames(
                cardClasses.card,
                classes['empty-card']
            )}
        >
            {children}
        </div>
    );
};

export default EmptyCard;
