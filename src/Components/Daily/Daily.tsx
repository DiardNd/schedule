import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetInterval } from '../../store/modules/Shedule/ScheduleSlice';

import styles from './Daily.module.css';

export const Daily = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const [interval, setInterval] = useState('');

  const handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInterval(event.target.value);
    reduxDispatch(toggleSetInterval({ minutesInterval: `/${interval}` }));
  };

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== 'Daily',
        [styles.dayOfWeek]: option === 'Daily'
      })}>
      Each
      <input type="number" min="0" max="59" value={interval} onChange={handleIntervalChange} />
      Minutes
    </form>
  );
};
