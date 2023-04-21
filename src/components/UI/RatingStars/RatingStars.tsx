import { FC } from 'react';
import classNames from 'classnames';

import classes from './RatingStars.module.scss';
import { MAX_RATING } from './constants';
import { ReactComponent as FilledStarIcon } from '../../../assets/icons/filled-star-icon.svg';
import { ReactComponent as EmptyStarIcon } from '../../../assets/icons/empty-star-icon.svg';

interface RatingStarsProps {
    rating?: number;
    isRateMode?: boolean;
    className: string;
    starIconClassName: string;
    onChangeRating?: (rating: number) => void;
}

const RatingStars: FC<RatingStarsProps> = ({
                                     rating = 0,
                                     isRateMode,
                                     className,
                                     starIconClassName,
                                     onChangeRating
                                 }) => {
    const ratingClasses = classNames(classes.rating, className);

    const noRatingStyles = { width: 'auto' };

    if (!(rating || isRateMode)) {
        return <span className={ratingClasses} style={noRatingStyles}>ещё нет оценок</span>;
    }

    return (
        <div data-test-id="rating" className={ratingClasses}>
            {[...new Array(MAX_RATING)]
                .map((emptyStar, index) => (
                    <div data-test-id="star" key={index}>
                        {rating >= index + 1
                            ? <FilledStarIcon
                                data-test-id="star-active"
                                className={starIconClassName}
                                onClick={() => onChangeRating?.(index + 1)}
                            />
                            : <EmptyStarIcon
                                className={starIconClassName}
                                onClick={() => onChangeRating?.(index + 1)}
                            />}
                    </div>
                ))}
        </div>
    );
};

export default RatingStars;
