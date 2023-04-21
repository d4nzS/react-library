import { ChangeEvent, FC } from 'react';

import classes from './MonthPicker.module.scss';

const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

interface MonthPickerProps {
    year: number;
    month: number;
    onChangeMonth: (month: number) => void;
}

const MonthPicker: FC<MonthPickerProps> = ({ year, month, onChangeMonth }) => {
    const changeMonthHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        onChangeMonth(+event.target.value);
    };

    return (
        <select
            data-test-id="month-select"
            value={month}
            className={classes.picker}
            onChange={changeMonthHandler}
        >
            {MONTHS.map((monthStr, monthNum) => (
                <option
                    key={monthNum}
                    value={monthNum}
                    className={classes.picker__option}
                >
                    {monthStr} {month === monthNum && year}
                </option>
            ))}
        </select>
    );
};

export default MonthPicker;
