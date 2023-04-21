import { FC } from 'react';
import classNames from 'classnames';

import classes from './Details.module.scss';
import sectionClasses from './Section.module.scss';

interface DetailItemProps {
    prop: string;
    value?: string;
}

const DetailItem: FC<DetailItemProps> = ({ prop, value }) => {
    return (
        <li className={classNames(
            classes.details__characteristic,
            { [classes.details__characteristic_invisible]: !value }
        )}>
            <span className={classes.details__prop}>{prop}</span>
            <span>{value}</span>
        </li>
    );
};

interface DetailsProps {
    publish?: string;
    issueYear?: string;
    pages?: string;
    cover?: string;
    format?: string;
    categories?: string[];
    weight?: string;
    ISBN?: string;
    producer?: string;
}

const Details: FC<DetailsProps> = ({
                                       publish,
                                       issueYear,
                                       pages,
                                       cover,
                                       format,
                                       categories,
                                       weight,
                                       ISBN,
                                       producer
                                   }) => {
    return (
        <section className={classes.details}>
            <h3 className={sectionClasses.title}>Подробная информация</h3>
            <hr className={sectionClasses['horizontal-line']}/>
            <div className={classes.details__content}>
                <ul className={classes.details__list}>
                    <DetailItem prop="Издательство" value={publish}/>
                    <DetailItem prop="Год издания" value={issueYear}/>
                    <DetailItem prop="Страниц" value={pages}/>
                    <DetailItem prop="Переплёт" value={cover}/>
                    <DetailItem prop="Формат" value={format}/>
                </ul>
                <ul className={classNames(classes.details__list, classes.details__list_position_right)}>
                    <DetailItem prop="Жанр" value={categories?.join(', ')}/>
                    <DetailItem prop="Вес" value={weight}/>
                    <DetailItem prop="ISBN" value={ISBN}/>
                    <DetailItem prop="Изготовитель" value={producer}/>
                </ul>
            </div>
        </section>
    );
};

export default Details;
