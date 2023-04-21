import { ChangeEvent, FC, useState } from 'react';

import classes from './RateBookModal.module.scss';
import { Comment } from '../../../models/book';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { getCurrentUserId } from '../../../utils/auth';
import Modal from '../../UI/Modal/Modal';
import RatingStars from '../../UI/RatingStars/RatingStars';
import { rateBook } from '../../../store/http/actions';

interface RateBookModalProps {
    bookId: string;
    comment?: Comment;
    onClose: () => void;
}

const RateBookModal: FC<RateBookModalProps> = ({
                                                   bookId,
                                                   comment,
                                                   onClose
                                               }) => {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState<number>(comment?.rating ?? 5);
    const [text, setText] = useState<string>(comment?.text ?? '');

    const changeBookRatingHandler = (rating: number): void => {
        setRating(rating);
    };

    const changeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };

    const submitReviewHandler = async (): Promise<void> => {
        await dispatch(rateBook({
            rating,
            text,
            book: bookId,
            user: getCurrentUserId()
        }, comment?.id));
    };

    return (
        <Modal
            dataTestId="modal-rate-book"
            title="Оцените книгу"
            btnDataTestId="button-comment"
            btnText={comment ? 'Изменить оценку' : 'Оценить книгу'}
            onSubmit={submitReviewHandler}
            onClose={onClose}
        >
            <h3 className={classes['rate-book-modal__rating-title']}>
                Ваша оценка
            </h3>
            <RatingStars
                isRateMode
                rating={rating}
                className={classes['rate-book-modal__rating']}
                starIconClassName={classes['rate-book-modal__rating-star']}
                onChangeRating={changeBookRatingHandler}
            />
            <textarea
                data-test-id="comment"
                placeholder="Оставьте отзыв"
                className={classes['rate-book-modal__textarea']}
                value={text}
                onChange={changeTextHandler}
            />
        </Modal>
    );
};

export default RateBookModal;
