import { FC } from 'react';

import classes from './Rating.module.scss';
import sectionClasses from './Section.module.scss';
import RatingStars from '../../UI/RatingStars/RatingStars';

interface RatingProps {
    rating?: number;
}

const Rating: FC<RatingProps> = ({ rating, }) => {
    return (
        <section className={classes.rating}>
            <h3 className={sectionClasses.title}>Рейтинг</h3>
            <hr className={sectionClasses['horizontal-line']}/>
            <div className={classes.rating__content}>
                <RatingStars
                    rating={rating}
                    className={classes['rating__rating-stars-container']}
                    starIconClassName={classes.rating__icon}
                />
                <span className={classes.rating__span}>{rating}</span>
            </div>
        </section>
    );
};

export default Rating;
