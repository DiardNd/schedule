import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { OptionType, ShedulerState } from './types';

const initialState: ShedulerState = {
  option: OptionType.Weekly,
  day: '',
  minutes: '',
  month: '',
  time: ''
};

const scheduleSlice = createSlice({
  name: 'ScheduleEditor',
  initialState,
  reducers: {
    toggleSetOption(state, action: PayloadAction<{ option: OptionType }>) {
      state.option = action.payload.option;
    },
    toggleSetInterval(state, action: PayloadAction<{ minutesInterval: string }>) {
      state.minutes = action.payload.minutesInterval;
    },
    toggleSetWeekly(state, action: PayloadAction<{ day: string; time: string }>) {
      state.day = action.payload.day;
      state.time = action.payload.time;
    },
    toggleSetCustom(
      state,
      action: PayloadAction<{ month: string; day: string; time: string; minutesInterval: string }>
    ) {
      const { month, day, time, minutesInterval } = action.payload;
      Object.assign(state, {
        month,
        day,
        time,
        minutes: minutesInterval
      });
    }
  }
});

export const { toggleSetOption, toggleSetInterval, toggleSetWeekly, toggleSetCustom } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
