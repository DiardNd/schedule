import { combineReducers } from '@reduxjs/toolkit';

import scheduleReducer from './modules/Shedule/ScheduleSlice';

export const rootReducer = combineReducers({ scheduleEditor: scheduleReducer });
