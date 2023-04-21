import { FC } from 'react';

import sectionClasses from './Section.module.scss';
import { UserBooking } from '../../../models/user';
import BookItem from '../../Shared/BookItem/BookItem';
import { BOOK_ITEM_WRAPPER_STYLES } from './section-constants';
import EmptyCard from '../../UI/Card/EmptyCard/EmptyCard';
import ExpiredCard from '../../UI/Card/ExpiredCard/ExpiredCard';

interface BookingProps {
    booking: UserBooking;
}

const Booking: FC<BookingProps> = ({booking}) => {
    const today = new Date();
    today.setHours(3, 0, 0, 0);

    return (
        <section className={sectionClasses.section}>
            <h3 className={sectionClasses.title}>
                Забронированная книга
            </h3>
            <p className={sectionClasses.hint}>
                Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
            </p>
            {booking.book
                ? (
                    <div style={BOOK_ITEM_WRAPPER_STYLES}>
                        <BookItem
                            {...booking.book}
                            booking={{id: +booking.id!, order: true}}
                            image={{url: booking.book.image}}
                        />
                        {new Date(booking.dateOrder!) < today && <ExpiredCard
                            message="Дата бронирования книги истекла"
                            hint="через 24 часа книга будет доступна всем"
                        />}
                    </div>
                )
                : (
                    <EmptyCard>
                        Забронируйте книгу и она отобразится
                    </EmptyCard>
                )}
        </section>
    );
};

export default Booking;
