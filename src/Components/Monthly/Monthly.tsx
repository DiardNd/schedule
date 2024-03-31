import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetMonth } from '../../store/modules/Shedule/ScheduleSlice';

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

  const handleIntervalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setMonth(newMonth);
    reduxDispatch(toggleSetMonth({ month: `${newMonth}` }));
  };

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== 'Monthly',
        [styles.dayOfWeek]: option === 'Monthly'
      })}>
      <select
        className={styles.monthSelector}
        name="month"
        value={month}
        onChange={handleIntervalChange}>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </form>
  );
};
