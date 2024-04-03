import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { OptionType, ShedulerState } from './types';

const initialState: ShedulerState = {
  option: OptionType.Weekly,
  day: '1',
  minutes: '0',
  month: '1',
  time: '00:00',
  addedTime: ''
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
    toggleSetWeekly(
      state,
      action: PayloadAction<{ day: string; time: string; addedTime?: string }>
    ) {
      state.day = action.payload.day;
      state.time = action.payload.time;
      state.addedTime = action.payload.addedTime;
    },
    toggleSetMonth(state, action: PayloadAction<{ month: string }>) {
      state.month = action.payload.month;
    },
    toggleSetAll(
      state,
      action: PayloadAction<{
        month?: string;
        day?: string;
        time?: string;
        minutesInterval?: string;
        addedTime?: string;
        option?: string;
      }>
    ) {
      const { month, day, time, minutesInterval, addedTime, option } = action.payload;
      Object.assign(state, {
        ...(month && { month }),
        ...(day && { day }),
        ...(time && { time }),
        ...(addedTime && { addedTime }),
        ...(minutesInterval && { minutes: minutesInterval }),
        option
      });
    }
  }
});

export const { toggleSetOption, toggleSetInterval, toggleSetWeekly, toggleSetAll, toggleSetMonth } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
