import {FC } from 'react';

import sectionClasses from './Section.module.scss';
import { UserDelivery } from '../../../models/user';
import { BOOK_ITEM_WRAPPER_STYLES } from './section-constants';
import BookItem from '../../Shared/BookItem/BookItem';
import EmptyCard from '../../UI/Card/EmptyCard/EmptyCard';
import ExpiredCard from '../../UI/Card/ExpiredCard/ExpiredCard';

interface DeliveryProps {
    delivery: UserDelivery;
}

const Delivery: FC<DeliveryProps> = ({delivery}) => {
    const today = new Date();
    today.setHours(3, 0, 0, 0);

    return (
        <section className={sectionClasses.section}>
            <h3 className={sectionClasses.title}>
                Книга которую взяли
            </h3>
            <p className={sectionClasses.hint}>
                Здесь можете просмотреть информацию о книге и узнать сроки возврата
            </p>
            {delivery.book
                ? (
                    <div style={BOOK_ITEM_WRAPPER_STYLES}>
                        <BookItem
                            {...delivery.book}
                            image={{url: delivery.book.image}}
                            delivery={{
                                id: +delivery.id!,
                                handed: true,
                                dateHandedTo: delivery.dateHandedTo
                            }}
                        />
                        {new Date(delivery.dateHandedTo!) < today && <ExpiredCard
                            message="Вышел срок пользования книги "
                            hint="Верните книгу, пожалуйста"
                        />}
                    </div>
                )
                : (
                    <EmptyCard>
                        Прочитав книгу, она отобразится в истории
                    </EmptyCard>
                )}
        </section>
    );
};

export default Delivery;
