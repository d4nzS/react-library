import {FC, useState} from 'react';
import classNames from 'classnames';

import classes from './Calendar.module.scss';
import {WEEK_DAYS, WeekDaysIndexes} from './constants';
import MonthPicker from './MonthSelector/MonthPicker';
import {ReactComponent as ToggleIcon} from '../../../../assets/icons/toggle-icon.svg';

interface Day {
    date: number;
    isAvailable: boolean;
    isToday: boolean;
    isWeekend?: boolean;
}

interface CalendarProps {
    selectedDate?: number;
    onSelectDay: (day: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ selectedDate, onSelectDay }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    const currentDay = today.getDay();

    const availableDays: Date[] = [];

    switch (currentDay) {
        case WeekDaysIndexes.FRIDAY:
            availableDays.push(
                today,
                new Date(currentYear, currentMonth, currentDate + 3)
            );

            break;

        case WeekDaysIndexes.SATURDAY:
            availableDays.push(new Date(currentYear, currentMonth, currentDate + 2));

            break;

        case WeekDaysIndexes.SUNDAY:
            availableDays.push(new Date(currentYear, currentMonth, currentDate + 1));

            break;

        default:
            availableDays.push(
                today,
                new Date(currentYear, currentMonth, currentDate + 1)
            );

            break;
    }

    const isDayAvailable = (day: Date): boolean => {
        return !!availableDays.find(availableDay => {
            return +day === +availableDay
        });
    };

    const isToday = (day: Date): boolean => {
        return +day === +today;
    };

    const [date, setDate] = useState<Date>(today);
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay() || 7;
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    const weeks: Day[][] = [[]];
    let currentWeek = 0;

    for (let i = firstDayOfMonth - 1; i >= 1; i--) {
        const date = daysInPrevMonth - i + 1;
        const testableDay = new Date(selectedYear, selectedMonth - 1, date);

        weeks[currentWeek].push({
            date,
            isAvailable: isDayAvailable(testableDay),
            isToday: isToday(testableDay)
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        if (weeks[currentWeek].length === 7) {
            weeks.push([]);
            currentWeek++;
        }

        const date = i;
        const testableDay = new Date(selectedYear, selectedMonth, date);

        weeks[currentWeek].push({
            date,
            isAvailable: isDayAvailable(testableDay),
            isToday: isToday(testableDay),
            isWeekend: [WeekDaysIndexes.FRIDAY, WeekDaysIndexes.SATURDAY].includes(weeks[currentWeek].length)
        });
    }

    let i = 1;
    while (weeks[currentWeek].length < 7) {
        const date = i;
        const testableDay = new Date(selectedYear, selectedMonth + 1, date);

        weeks[currentWeek].push({
            date,
            isAvailable: isDayAvailable(testableDay),
            isToday: isToday(testableDay)
        });

        i++;
    }

    const prevMonthHandler = (): void => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };

    const nextMonthHandler = (): void => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };

    const changeMonthHandler = (month: number): void => {
        setDate(prevDate => new Date(prevDate.getFullYear(), month));
    };

    return (
        <div data-test-id="calendar" className={classes.calendar}>
            <div className={classes.calendar__caption}>
                <MonthPicker
                    year={selectedYear}
                    month={selectedMonth}
                    onChangeMonth={changeMonthHandler}
                />
                <button
                    data-test-id="button-prev-month"
                    className={classNames(
                        classes.calendar__button,
                        classes.calendar__button_first
                    )}
                    onClick={prevMonthHandler}
                >
                    <ToggleIcon className={classNames(
                        classes.calendar__icon,
                        classes.calendar__icon_reversed
                    )}/>
                </button>
                <button
                    data-test-id="button-next-month"
                    className={classes.calendar__button}
                    onClick={nextMonthHandler}
                >
                    <ToggleIcon className={classes.calendar__icon}/>
                </button>
            </div>
            <table className={classes.calendar__table}>
                <thead>
                <tr>
                    {WEEK_DAYS.map(day => (
                        <th
                            key={day}
                            className={classNames(
                                classes.calendar__cell,
                                classes.calendar__cell_type_header
                            )}
                        >
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {weeks.map((week, index) => (
                    <tr key={index}>
                        {week.map(day => (
                            <td
                                data-test-id="day-button"
                                key={day.date}
                                className={classNames(
                                    classes.calendar__cell,
                                    { [classes.calendar__cell_available]: day.isAvailable },
                                    { [classes.calendar__cell_type_weekend]: day.isWeekend },
                                    { [classes.calendar__cell_type_today]: day.isToday },
                                    { [classes.calendar__cell_selected]: day.isAvailable && day.date === selectedDate },
                                )}
                                onClick={day.isAvailable
                                    ? () => onSelectDay(new Date(currentYear, currentMonth, day.date))
                                    : undefined}
                            >
                                {day.date}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
