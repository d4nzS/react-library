import { FC, useState } from 'react';
import classNames from 'classnames';

import classes from './Reviews.module.scss';
import sectionClasses from './Section.module.scss';
import { Comment } from '../../../models/book'
import { getCurrentUserId } from '../../../utils/auth';
import { ReactComponent as ToggleIcon } from '../../../assets/icons/toggle-icon.svg';
import { HOST_URL } from '../../../api';
import defaultAvatarImg from '../../../assets/images/default-avatar.png';
import RatingStars from '../../UI/RatingStars/RatingStars';
import Button from '../../UI/Button/Button';
import RateBookModal from '../../Shared/RateBookModal/RateBookModal';
import useModal from '../../../hooks/useModal';

const formatDate = (date: string): string => {
    const formatter = new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(new Date(date)).slice(0, -3);
};

interface ReviewsProps {
    bookId: string;
    comments?: Comment[];
    modalIsOpenInitially: boolean;
}

const Reviews: FC<ReviewsProps> = ({
                                       bookId,
                                       comments,
                                       modalIsOpenInitially
                                   }) => {
    const [reviewsIsOpen, setReviewsIsOpen] = useState<boolean>(true);
    const { modalIsShown, showModalHandler, hideModalHandler } = useModal(modalIsOpenInitially);
    const commentByCurrentUser = comments?.find(comment => comment.user.commentUserId === +getCurrentUserId());

    const toggleReviewsVisionHandler = (): void => {
        setReviewsIsOpen(prevState => !prevState);
    };

    return (
        <>
            {modalIsShown && <RateBookModal
                comment={commentByCurrentUser}
                bookId={bookId}
                onClose={hideModalHandler}
            />}
            <section data-test-id="reviews" className={classes.reviews}>
                <h3 className={classNames(sectionClasses.title, classes.reviews__title)}>
                    Отзывы <span className={classes.reviews__span}>{comments?.length}</span>
                    <button
                        data-test-id="button-hide-reviews"
                        type="button"
                        className={classNames(
                            classes['reviews__toggle-button'],
                            { [classes['reviews__toggle-button_invisible']]: !comments }
                        )}
                        onClick={toggleReviewsVisionHandler}
                    >
                        <ToggleIcon className={classNames(
                            classes['reviews__toggle-icon'],
                            { [classes['reviews__toggle-icon_reversed']]: reviewsIsOpen }
                        )}/>
                    </button>
                </h3>
                {reviewsIsOpen && (
                    <>
                        <hr className={sectionClasses['horizontal-line']}/>
                        {comments?.map(comment => (
                            <article
                                data-test-id="comment-wrapper"
                                key={comment.id}
                                className={classes['reviews__comment']}
                            >
                                <div className={classes.reviews__header}>
                                    <img
                                        src={comment.user.avatarUrl
                                            ? `${HOST_URL}${comment.user.avatarUrl}`
                                            : defaultAvatarImg}
                                        alt="AuthResponse Avatar"
                                        className={classes.reviews__image}
                                    />
                                    <div className={classes.reviews__info}>
                                        <span data-test-id="comment-author">{comment.user.firstName} {comment.user.lastName}</span>
                                        <span data-test-id="comment-date">{formatDate(comment.createdAt)}</span>
                                    </div>
                                </div>
                                <RatingStars
                                    rating={comment.rating}
                                    className={classes['reviews__rating-stars-container']}
                                    starIconClassName={classes['reviews__star-icon']}
                                />
                                <div
                                    data-test-id="comment-text"
                                    className={classes.reviews__content}
                                >
                                    {comment.text}
                                </div>
                            </article>
                        )).reverse()}
                    </>
                )}
                <Button
                    dataTestId="button-rate-book"
                    styleType={commentByCurrentUser ? 'secondary' : 'primary'}
                    className={classNames(sectionClasses.button, classes.reviews__button)}
                    onClick={showModalHandler}
                >
                    {commentByCurrentUser
                        ? 'Изменить оценку'
                        : 'Оценить книгу'}
                </Button>
            </section>
        </>
    );
};

export default Reviews;
