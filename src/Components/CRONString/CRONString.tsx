import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsCronValid } from '../../utils/validationLoadCron';
import { toggleSetAll } from '../../store/modules/Shedule/ScheduleSlice';
import { OptionType } from '../../store/modules/Shedule/types';

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

    if (option === OptionType.Daily) {
      newCronString = `*${interval} * * * *`;
    } else if (option === OptionType.Weekly) {
      if (addedTime) {
        newCronString = `${time!.split(':')[1]},${addedTime!.split(':')[1]} ${
          time!.split(':')[0]
        },${addedTime!.split(':')[0]} * * ${dayOfWeek}`;
      } else {
        newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * * ${dayOfWeek}`;
      }
    } else if (option === OptionType.Custom) {
      newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * ${month} ${dayOfWeek}`;
    } else {
      newCronString = `0 0 * ${month} *`;
    }
    setCronString(newCronString);
    setErrorMessage(checkIsCronValid(newCronString));
  };

  const loadCronString = () => {
    const parts = cronString.split(' ');
    if (parts.length === 5 && !errorMessage) {
      const [minute, hour, day, month, dayOfWeek] = parts;
      const intervalRegex = /\*\/[0-5]?\d$|\/\*59$/;

      let newOption;
      let newTime;
      let newAddedTime;
      let newInterval;
      let newDayOfWeek;
      let newMonth;

      const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const formattedHours = hours.length === 1 ? `0${hours}` : hours;
        const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}`;
      };

      const isAddedTime = (hour: string, minute: string) => {
        let formattedHours = '';
        let formattedMinutes = '';
        let formattedAddedHours = '';
        let formattedAddedMinutes = '';

        if (hour.includes(',')) {
          const [hours, addedHours] = hour.split(',');
          formattedHours = hours.length === 1 ? `0${hours}` : hours;
          formattedAddedHours = addedHours.length === 1 ? `0${addedHours}` : addedHours;
        } else {
          formattedHours = hour.length === 1 ? `0${hour}` : hour;
        }

        if (minute.includes(',')) {
          const [minutes, addedMinutes] = minute.split(',');
          formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
          formattedAddedMinutes = addedMinutes.length === 1 ? `0${addedMinutes}` : addedMinutes;
        } else {
          formattedMinutes = minute.length === 1 ? `0${minute}` : minute;
        }

        return `${formattedHours}:${formattedMinutes} ${formattedAddedHours}:${formattedAddedMinutes}`;
      };

      if (minute !== '*' && hour !== '*' && dayOfWeek !== '*' && month === '*') {
        newOption = OptionType.Weekly;
        newTime = isAddedTime(`${hour}`, `${minute}`).substring(0, 5);

        if (isAddedTime(`${hour}`, `${minute}`).length > 10) {
          newAddedTime = isAddedTime(`${hour}`, `${minute}`).substring(6);
        } else newAddedTime = '';
        newDayOfWeek = `${dayOfWeek}`;
      } else if (intervalRegex.test(minute)) {
        newOption = OptionType.Daily;
        newInterval = minute.substring(2);
      } else if (month !== '*' && minute === '0' && hour === '0' && dayOfWeek === '*') {
        newOption = OptionType.Monthly;
        newTime = `${hour}:${minute}`;
        newMonth = month;
      } else {
        newOption = OptionType.Custom;
        newTime = formatTime(`${hour}:${minute}`);
        newDayOfWeek = dayOfWeek;
        newMonth = month;
      }

      reduxDispatch(
        toggleSetAll({
          option: newOption,
          time: newTime,
          minutesInterval: newInterval,
          day: newDayOfWeek,
          month: newMonth,
          addedTime: newAddedTime
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
      <button className={styles.button} onClick={generateCronString}>
        Save
      </button>
      <button className={styles.button} onClick={loadCronString} disabled={!isValid}>
        Load
      </button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};
