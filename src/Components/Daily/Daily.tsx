import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetInterval } from '../../store/modules/Shedule/ScheduleSlice';

import styles from './Daily.module.css';

export const Daily = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const storeMinutesInterval = useAppSelector((state) => state.scheduleEditor.minutes);
  const [interval, setInterval] = useState('');

  useEffect(() => {
    if (storeMinutesInterval) {
      setInterval(storeMinutesInterval.replace('/', ''));
    }
  }, [storeMinutesInterval]);

  const handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInterval = event.target.value;
    setInterval(newInterval);
    reduxDispatch(toggleSetInterval({ minutesInterval: `/${newInterval}` }));
  };

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== 'Daily',
        [styles.dayOfWeek]: option === 'Daily'
      })}>
      Each
      <input
        className={styles.timeInput}
        type="number"
        min="0"
        max="59"
        value={interval}
        onChange={handleIntervalChange}
      />
      Minutes
    </form>
  );
};
