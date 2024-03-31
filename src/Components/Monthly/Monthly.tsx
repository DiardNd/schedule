import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetInterval } from '../../store/modules/Shedule/ScheduleSlice';

import styles from './Monthly.module.css';

export const Monthly = () => {
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
        [styles.hidden]: option !== 'Monthly',
        [styles.dayOfWeek]: option === 'Monthly'
      })}>
      <select name="month">
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </form>
  );
};
