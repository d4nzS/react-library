import { Image } from '../../../../models/books';

interface ImagesSliderProps {
    images?: Image[];
    title: string;
    className: string;
    imgClassName: string;
    imgIconClassName?: string;
}

export default ImagesSliderProps;
