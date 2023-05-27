import { FC } from 'react';
import classNames from 'classnames';

import classes from './Image.module.scss';
import { ReactComponent as DefaultImageIcon } from '../../../assets/icons/default-image-icon.svg';

interface ImageProps {
    src?: string;
    alt: string;
    className: string;
    defaultIconClassName?: string;
}

const Image: FC<ImageProps> = ({
                                   src,
                                   alt,
                                   className,
                                   defaultIconClassName
                               }) => {
    if (src) {
        return <img src={src} alt={alt} className={classNames(classes.image, className)}/>;
    }

    return (
        <div className={classNames(classes.image, classes.image_type_default, className)}>
            <DefaultImageIcon className={defaultIconClassName}/>
        </div>
    );
};

export default Image;
