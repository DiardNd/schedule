import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector } from '../../hooks';

import styles from './Weekly.module.css';

export const Weekly = () => {
  const [hideForm, setHideForm] = useState(true);
  const [time, setTime] = useState('');
  const option = useAppSelector((state) => state.scheduleEditor.option);

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <form
      className={classNames({
        [styles.hidden]: option !== 'Weekly',
        [styles.dayOfWeek]: option === 'Weekly'
      })}>
      Every Day
      <select name="Day of week" className={styles.daySelector}>
        <option value="Monday">Monday</option>
        <option value="Thuesday">Thuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      At
      <input type="text" name="time" value={time} onChange={handleTimeChange} />
    </form>
  );
};
