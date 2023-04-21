import { FC } from 'react';

import sectionClasses from './Section.module.scss';
import { UserComment, UserHistory } from '../../../models/user';
import EmptyCard from '../../UI/Card/EmptyCard/EmptyCard';
import BooksSlider from '../../UI/Slider/BooksSlider/BooksSlider';

interface HistoryProps {
    history: UserHistory;
    comments: UserComment[];
}

const History: FC<HistoryProps> = ({history, comments}) => {
    return (
        <section
            data-test-id='history'
            className={sectionClasses.section}
        >
            <h3 className={sectionClasses.title}>
                История
            </h3>
            <p className={sectionClasses.hint}>
                Список прочитанных книг
            </p>
            {history.books
                ? <BooksSlider books={history.books.map(book => ({
                    ...book,
                    image: {url: book.image},
                    histories: [{id: history.id}],
                    isCommented: comments.some(comment => comment.bookId === book.id)
                }))}/>
                : (
                    <EmptyCard>
                        Вы не читали книг из нашей библиотеки
                    </EmptyCard>
                )}
        </section>
    );
};

export default History;
