import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import classes from './BooksSlider.module.scss';
import { BookItemProps as Book } from '../../../Shared/BookItem/BookItem';
import useAppSelector from '../../../../hooks/useAppSelector';
import { currentBreakpointSelector } from '../../../../store/ui/selectors';
import { SWIPER_HEIGHT } from './constants';
import BookItem from '../../../Shared/BookItem/BookItem';

interface BooksSliderProps {
    books: Book[];
}

const BooksSlider: FC<BooksSliderProps> = ({ books }) => {
    const currentBreakpoint = useAppSelector(currentBreakpointSelector);

    const swiperSpaceBetween = currentBreakpoint === 'xxl' ? 30 : 35;

    return (
        <Swiper
            height={SWIPER_HEIGHT}
            slidesPerView="auto"
            spaceBetween={swiperSpaceBetween}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination]}
            className={classes.swiper}
        >
            {books.map(book => (
                <SwiperSlide
                    data-test-id="history-slide"
                    key={book.id}
                    className={classes.slide}
                >
                    <BookItem {...book}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BooksSlider;
