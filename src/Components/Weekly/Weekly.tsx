import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSetWeekly } from '../../store/modules/Shedule/ScheduleSlice';

import styles from './Weekly.module.css';

export const Weekly = () => {
  const reduxDispatch = useAppDispatch();
  const [time, setTime] = useState('00:00');
  const [addTime, setAddTime] = useState('00:00');
  const [dayOfWeek, setDayOfWeek] = useState('0');
  const [hideTime, setHideTime] = useState(true);

  const option = useAppSelector((state) => state.scheduleEditor.option);
  const storeDay = useAppSelector((state) => state.scheduleEditor.day);
  const storeTime = useAppSelector((state) => state.scheduleEditor.time);

  useEffect(() => {
    if (storeDay) {
      setDayOfWeek(storeDay);
    }
    if (storeTime) {
      setTime(storeTime);
    }
  }, [storeDay, storeTime]);

  const handleShowTime = () => {
    setHideTime(!hideTime);
    if (hideTime) {
      setAddTime('');
    }
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    reduxDispatch(toggleSetWeekly({ day: dayOfWeek, time: newTime }));
  };

  const handleAddedTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAddedTime = event.target.value;
    setAddTime(newAddedTime);
    reduxDispatch(toggleSetWeekly({ day: dayOfWeek, time: time, addedTime: newAddedTime }));
  };

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newDayOfWeek = event.target.value;
    setDayOfWeek(newDayOfWeek);
    reduxDispatch(toggleSetWeekly({ day: newDayOfWeek, time: time }));
  };

  return (
    <div
      className={classNames({
        [styles.hidden]: option !== 'Weekly',
        [styles.dayOfWeek]: option === 'Weekly'
      })}>
      Every
      <select
        name="Day of week"
        value={dayOfWeek}
        onChange={handleDayChange}
        className={styles.daySelector}>
        <option value="0">Monday</option>
        <option value="1">Tuesday</option>
        <option value="2">Wednesday</option>
        <option value="3">Thursday</option>
        <option value="4">Friday</option>
        <option value="5">Saturday</option>
        <option value="6">Sunday</option>
      </select>
      At
      <input
        className={styles.timeInput}
        type="time"
        name="time"
        value={time}
        onChange={handleTimeChange}
      />
      <button className={styles.btn} onClick={handleShowTime}>
        +
      </button>
      <input
        className={classNames({
          [styles.hidden]: hideTime,
          [styles.timeInput]: !hideTime
        })}
        type="time"
        name="addTime"
        value={addTime}
        onChange={handleAddedTimeChange}
      />
    </div>
  );
};
