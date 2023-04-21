import { FC } from 'react';
import classNames from 'classnames';

import classes from './Overview.module.scss';
import sectionClasses from './Section.module.scss';
import { Image, Booking, Delivery } from '../../../models/books';
import useModal from '../../../hooks/useModal';
import useBooking from '../../../hooks/useBooking';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import ImagesSlider from '../../UI/Slider/ImagesSlider/ImagesSlider';
import Button, { BtnStyleType } from '../../UI/Button/Button';
import { getCurrentUserId } from '../../../utils/auth';
import createBtnTextFromBookStatus from '../../../utils/create-btn-text-from-book-status';

interface OverviewProps {
    id: string;
    title: string;
    images?: Image[];
    authors?: string[];
    issueYear?: string;
    booking?: Booking;
    delivery?: Delivery;
    description?: string;
}

const Overview: FC<OverviewProps> = ({
                                         id,
                                         title,
                                         images,
                                         authors,
                                         issueYear,
                                         booking,
                                         delivery,
                                         description
                                     }) => {
    const { modalIsShown, showModalHandler, hideModalHandler } = useModal();
    const { currentBooking, bookingHandler, cancelBookingHandler } = useBooking(booking);

    const bookingStyleType: BtnStyleType = booking?.order || delivery?.handed ? 'secondary' : 'primary';
    const bookingBtnIsDisabled = booking?.order && booking.customerId !== +getCurrentUserId() || delivery?.handed;

    return (
        <>
            {modalIsShown && <BookingModal
                bookId={id}
                booking={currentBooking}
                onClose={hideModalHandler}
                onBooking={bookingHandler}
                onCancelBooking={cancelBookingHandler}
            />}
            <section className={classes.overview}>
                <ImagesSlider
                    images={images}
                    title={title}
                    className={classes['overview__image-container']}
                    imgClassName={classes.overview__image}
                    imgIconClassName={classes.overview__icon}
                />
                <div className={classes['overview__grid-item']}>
                    <h2
                        data-test-id="book-title"
                        className={classes.overview__title}
                    >
                        {title}
                    </h2>
                    <span className={classes.overview__span}>
                        {authors?.map(author => `${author}, `)} {issueYear}
                    </span>
                    <Button
                        dataTestId="booking-button"
                        styleType={bookingStyleType}
                        disabled={bookingBtnIsDisabled}
                        className={classNames(sectionClasses.button, classes.overview__button)}
                        onClick={showModalHandler}
                    >
                        {createBtnTextFromBookStatus(booking || delivery)}
                    </Button>
                </div>
                <article className={classes.overview__description}>
                    <h3 className={sectionClasses.title}>О книге</h3>
                    <hr className={sectionClasses['horizontal-line']}/>
                    <p>{description}</p>
                </article>
            </section>
        </>
    );
};

export default Overview;
