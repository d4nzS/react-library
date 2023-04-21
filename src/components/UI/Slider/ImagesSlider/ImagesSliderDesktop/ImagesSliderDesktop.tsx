import { FC, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './ImagesSliderDesktop.scss';
import ImagesSliderProps from '../images-slider-interface';
import Image from '../../../Image/Image';
import { SWIPER_SPACE_BETWEEN } from './constants';

const ImagesSliderDesktop: FC<ImagesSliderProps> = ({
                                                        images,
                                                        title,
                                                        className,
                                                        imgClassName
                                                    }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

    return (
        <div className={className}>
            <Swiper
                spaceBetween={SWIPER_SPACE_BETWEEN}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {images?.map(image => (
                    <SwiperSlide
                        data-test-id="slide-mini"
                        key={image.url}
                    >
                        <Image
                            src={image.url}
                            alt={title}
                            className={imgClassName}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                data-test-id="slide-big"
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-mini"
            >
                {images?.map(image => (
                    <SwiperSlide
                        data-test-id="slide-mini"
                        key={image.url}
                    >
                        <Image
                            src={image.url}
                            alt={title}
                            className="swiper-mini__image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImagesSliderDesktop;
