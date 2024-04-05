import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetWeekly } from '../../store/modules/Schedule/ScheduleSlice';
import { OptionType } from '../../store/modules/Schedule/types';

import styles from './Weekly.module.css';

export const Weekly = () => {
  const reduxDispatch = useAppDispatch();
  const [time, setTime] = useState('00:00');
  const [dayOfWeek, setDayOfWeek] = useState('0');
  const [addTime, setAddTime] = useState('');

  const option = useAppSelector((state) => state.scheduleEditor.option);
  const storeDay = useAppSelector((state) => state.scheduleEditor.day);
  const storeTime = useAppSelector((state) => state.scheduleEditor.time);
  const storeAddedTime = useAppSelector((state) => state.scheduleEditor.addedTime);

  useEffect(() => {
    if (storeDay) {
      setDayOfWeek(storeDay);
    }
    if (storeTime) {
      setTime(storeTime);
    }
    if (storeAddedTime) setAddTime(storeAddedTime);
  }, [storeDay, storeTime, storeAddedTime]);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    reduxDispatch(toggleSetWeekly({ day: dayOfWeek, time: newTime, addedTime: addTime }));
  };

  const handleAddedTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAddedTime = event.target.value;
    setAddTime(newAddedTime);
    reduxDispatch(toggleSetWeekly({ day: dayOfWeek, time: time, addedTime: newAddedTime }));
  };

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDayOfWeek = event.target.value;
    setDayOfWeek(newDayOfWeek);
    reduxDispatch(toggleSetWeekly({ day: newDayOfWeek, time: time, addedTime: addTime }));
  };

  const daysOfWeek = [
    { value: '1', name: 'Monday' },
    { value: '2', name: 'Tuesday' },
    { value: '3', name: 'Wednesday' },
    { value: '4', name: 'Thursday' },
    { value: '5', name: 'Friday' },
    { value: '6', name: 'Saturday' },
    { value: '7', name: 'Sunday' }
  ];

  return (
    <div
      className={classNames({
        [styles.hidden]: option !== OptionType.Weekly,
        [styles.dayOfWeek]: option === OptionType.Weekly
      })}>
      Every
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
      <input
        className={styles.timeInput}
        type="time"
        name="addTime"
        value={addTime}
        onChange={handleAddedTimeChange}
      />
    </div>
  );
};
