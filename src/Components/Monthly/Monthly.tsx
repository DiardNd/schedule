import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetMonth } from '../../store/modules/Shedule/ScheduleSlice';
import { OptionType } from '../../store/modules/Shedule/types';

import styles from './Monthly.module.css';

export const Monthly = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const storeMonth = useAppSelector((state) => state.scheduleEditor.month);
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (storeMonth) {
      setMonth(storeMonth);
    }
  }, [storeMonth]);

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setMonth(newMonth);
    reduxDispatch(toggleSetMonth({ month: `${newMonth}` }));
  };

  const months = [
    { value: '1', name: 'January' },
    { value: '2', name: 'February' },
    { value: '3', name: 'March' },
    { value: '4', name: 'April' },
    { value: '5', name: 'May' },
    { value: '6', name: 'June' },
    { value: '7', name: 'July' },
    { value: '8', name: 'August' },
    { value: '9', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== OptionType.Monthly,
        [styles.dayOfWeek]: option === OptionType.Monthly
      })}>
      <select
        className={styles.monthSelector}
        name="month"
        value={month}
        onChange={handleMonthChange}>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.name}
          </option>
        ))}
      </select>
    </form>
  );
};
