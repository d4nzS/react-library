import { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import 'swiper/css';
import 'swiper/css/pagination';

import classes from './ImagesSlider.module.scss';
import ImagesSliderProps from './images-slider-interface';
import useAppSelector from '../../../../hooks/useAppSelector';
import { currentBreakpointSelector } from '../../../../store/ui/selectors';
import Image from '../../Image/Image';
import ImagesSliderDesktop from './ImagesSliderDesktop/ImagesSliderDesktop';
import { SWIPER_SPACE_BETWEEN } from './constants';

const ImagesSlider: FC<ImagesSliderProps> = props => {
    const { images, title, className, imgClassName, imgIconClassName } = props;
    const currentBreakpoint = useAppSelector(currentBreakpointSelector);

    if (!images || images.length === 1) {
        return <Image
            src={images?.[0].url}
            alt={title}
            className={classNames(imgClassName, className)}
            defaultIconClassName={imgIconClassName}
        />;
    }

    if (currentBreakpoint === 'xxl') {
        return <ImagesSliderDesktop {...props}/>;
    }

    return (
        <Swiper
            data-test-id="slide-big"
            pagination={{
                clickable: true
            }}
            modules={[Pagination]}
            className={classNames(classes.swiper, className)}
            spaceBetween={SWIPER_SPACE_BETWEEN}
        >
            {images.map(image => (
                <SwiperSlide
                    data-test-id="slide-mini"
                    key={image.url}
                >
                    <Image
                        src={image.url}
                        alt={title}
                        className={imgClassName}
                        defaultIconClassName={imgIconClassName}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ImagesSlider;
