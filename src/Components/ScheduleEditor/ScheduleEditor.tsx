import { Weekly } from '../Weekly';
import { Daily } from '../Daily';
import { CRONString } from '../CRONString';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OptionType } from '../../store/modules/Schedule/types';
import { toggleSetOption } from '../../store/modules/Schedule/ScheduleSlice';
import { Monthly } from '../Monthly';
import { Custom } from '../Custom';

import styles from './ScheduleEditor.module.css';

export const ScheduleEditor = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);

  const handleOptionChange = (selectedOption: OptionType) => {
    reduxDispatch(toggleSetOption({ option: selectedOption }));
  };

  return (
    <div className={styles.scheduleEditor}>
      <h2 className={styles.header}>ScheduleEditor</h2>
      <ul className={styles.optionsList}>
        <li className={styles.optionItem}>
          <label className={styles.optionLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name="scheduleOption"
              value="Weekly"
              checked={option === OptionType.Weekly}
              onChange={() => handleOptionChange(OptionType.Weekly)}
            />
            Weekly
          </label>
          <Weekly />
        </li>
        <li className={styles.optionItem}>
          <label className={styles.optionLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name="scheduleOption"
              value="Daily"
              checked={option === OptionType.Daily}
              onChange={() => handleOptionChange(OptionType.Daily)}
            />
            Daily
          </label>
          <Daily />
        </li>
        <li className={styles.optionItem}>
          <label className={styles.optionLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name="scheduleOption"
              value="Monthly"
              checked={option === OptionType.Monthly}
              onChange={() => handleOptionChange(OptionType.Monthly)}
            />
            Monthly
          </label>
          <Monthly />
        </li>
        <li className={styles.optionItem}>
          <label className={styles.optionLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name="scheduleOption"
              value="Custom"
              checked={option === OptionType.Custom}
              onChange={() => handleOptionChange(OptionType.Custom)}
            />
            Custom
          </label>
          <Custom />
        </li>
      </ul>
      <CRONString />
    </div>
  );
};
