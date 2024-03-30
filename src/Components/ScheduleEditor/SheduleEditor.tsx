import { Weekly } from '../Weekly';
import { Daily } from '../Daily';
import { CRONString } from '../CRONString';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OptionType } from '../../store/modules/Shedule/types';
import { toggleSetOption } from '../../store/modules/Shedule/ScheduleSlice';
import { Monthly } from '../Monthly';

import styles from './SheduleEditor.module.css';

export const SheduleEditor = () => {
  const reduxDispatch = useAppDispatch();
  const option = useAppSelector((state) => state.scheduleEditor.option);

  const handleOptionChange = (selectedOption: OptionType) => {
    reduxDispatch(toggleSetOption({ option: selectedOption }));
  };

  return (
    <div>
      <h2 className={styles.header}>SheduleEditor</h2>
      <div>
        <label>
          <input
            type="radio"
            name="scheduleOption"
            value="Weekly"
            checked={option === OptionType.Weekly}
            onChange={() => handleOptionChange(OptionType.Weekly)}
          />
          Weekly
          <Weekly />
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="scheduleOption"
            value="Daily"
            checked={option === OptionType.Daily}
            onChange={() => handleOptionChange(OptionType.Daily)}
          />
          Daily
          <Daily />
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="scheduleOption"
            value="Monthly"
            checked={option === OptionType.Monthly}
            onChange={() => handleOptionChange(OptionType.Monthly)}
          />
          Monthly
          <Monthly />
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="scheduleOption"
            value="Custom"
            checked={option === OptionType.Custom}
            onChange={() => handleOptionChange(OptionType.Custom)}
          />
          Custom
        </label>
      </div>
      <button>Load</button>
      <button>Save</button>
      <CRONString />
    </div>
  );
};
