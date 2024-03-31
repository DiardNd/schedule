import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsCronValid } from '../../utils/validationLoadCron';
import { toggleSetAll } from '../../store/modules/Shedule/ScheduleSlice';

import styles from './CRONString.module.css';

export const CRONString = () => {
  const interval = useAppSelector((state) => state.scheduleEditor.minutes);
  const dayOfWeek = useAppSelector((state) => state.scheduleEditor.day);
  const time = useAppSelector((state) => state.scheduleEditor.time);
  const month = useAppSelector((state) => state.scheduleEditor.month);
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const addedTime = useAppSelector((state) => state.scheduleEditor.addedTime);

  const reduxDispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cronString, setCronString] = useState('');
  const isValid = !errorMessage;

  const generateCronString = () => {
    let newCronString = '';

    if (option === 'Daily') {
      newCronString = `*${interval} * * * *`;
    } else if (option === 'Weekly') {
      if (addedTime) {
        newCronString = `${time!.split(':')[1]},${addedTime!.split(':')[1]} ${
          time!.split(':')[0]
        },${addedTime!.split(':')[0]} * * ${dayOfWeek}`;
      } else {
        newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * * ${dayOfWeek}`;
      }
    } else if (option === 'Custom') {
      newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * ${month} ${dayOfWeek}`;
    } else {
      newCronString = `0 0 * ${month} *`;
    }
    setCronString(newCronString);
  };

  const loadCronString = () => {
    const parts = cronString.split(' ');
    if (parts.length === 5) {
      const [minute, hour, day, month, dayOfWeek] = parts;
      const intervalRegex = /\*\/[0-5]?\d$|\/\*59$/;

      let newOption;
      let newTime;
      let newInterval;
      let newDayOfWeek;
      let newMonth;

      if (minute !== '*' && hour !== '*' && dayOfWeek !== '*') {
        newOption = 'Weekly';
        newTime = `${hour}:${minute}`;
        newDayOfWeek = `${dayOfWeek}`;
      } else if (intervalRegex.test(minute)) {
        newOption = 'Daily';
        newInterval = minute.substring(2);
      } else if (month !== '*' && minute === '0' && hour === '0' && dayOfWeek === '*') {
        newOption = 'Monthly';
        newTime = `${hour}:${minute}`;
        newMonth = month;
      } else {
        newOption = 'Custom';
        newTime = `${hour}:${minute}`;
        newDayOfWeek = dayOfWeek;
        newMonth = month;
      }

      reduxDispatch(
        toggleSetAll({
          option: newOption,
          time: newTime,
          minutesInterval: newInterval,
          day: newDayOfWeek,
          month: newMonth
        })
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCronString(event.target.value);
    setErrorMessage(checkIsCronValid(event.target.value));
  };

  return (
    <div>
      <input
        className={styles.cronInput}
        type="text"
        name="Cron string"
        value={cronString}
        onChange={handleInputChange}
      />
      <button className={styles.btn} onClick={generateCronString}>
        Save
      </button>
      <button className={styles.btn} onClick={loadCronString} disabled={!isValid}>
        Load
      </button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};
