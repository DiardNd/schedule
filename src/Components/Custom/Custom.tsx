import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetAll } from '../../store/modules/Shedule/ScheduleSlice';
import { OptionType } from '../../store/modules/Shedule/types';

import styles from './Custom.module.css';

export const Custom = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const [month, setMonth] = useState('');
  const [time, setTime] = useState('00:00');
  const [dayOfWeek, setDayOfWeek] = useState('0');

  const storeMonth = useAppSelector((state) => state.scheduleEditor.month);
  const storeDay = useAppSelector((state) => state.scheduleEditor.day);
  const storeTime = useAppSelector((state) => state.scheduleEditor.time);

  useEffect(() => {
    if (storeDay) {
      setDayOfWeek(storeDay);
    }
    if (storeTime) {
      setTime(storeTime);
    }
    if (storeMonth) {
      setMonth(storeMonth);
    }
  }, [storeDay, storeTime, storeMonth]);

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setMonth(newMonth);
    reduxDispatch(
      toggleSetAll({
        time: time,
        day: dayOfWeek,
        month: month,
        option: OptionType.Custom
      })
    );
  };

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDayOfWeek = event.target.value;
    setDayOfWeek(newDayOfWeek);
    reduxDispatch(
      toggleSetAll({
        time: time,
        day: newDayOfWeek,
        month: month,
        option: OptionType.Custom
      })
    );
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    reduxDispatch(
      toggleSetAll({
        time: newTime,
        day: dayOfWeek,
        month: month,
        option: OptionType.Custom
      })
    );
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
    { value: '12', name: 'December' },
    { value: '*', name: 'Every' }
  ];

  const daysOfWeek = [
    { value: '*', name: 'Every' },
    { value: '1', name: 'Monday' },
    { value: '2', name: 'Tuesday' },
    { value: '3', name: 'Wednesday' },
    { value: '4', name: 'Thursday' },
    { value: '5', name: 'Friday' },
    { value: '6', name: 'Saturday' },
    { value: '7', name: 'Sunday' }
  ];

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== OptionType.Custom,
        [styles.custom]: option === OptionType.Custom
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
      <select
        name="Day of week"
        value={dayOfWeek}
        onChange={handleDayChange}
        className={styles.daySelector}>
        {daysOfWeek.map((day) => (
          <option key={day.value} value={day.value}>
            {day.name}
          </option>
        ))}
      </select>
      At
      <input
        className={styles.timeInput}
        type="time"
        name="time"
        value={time}
        onChange={handleTimeChange}
      />
    </form>
  );
};
