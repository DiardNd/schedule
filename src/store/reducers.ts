import { combineReducers } from '@reduxjs/toolkit';

import scheduleReducer from './modules/Schedule/ScheduleSlice';

export const rootReducer = combineReducers({ scheduleEditor: scheduleReducer });
