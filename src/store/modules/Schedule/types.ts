export enum OptionType {
  Weekly = 'Weekly',
  Daily = 'Daily',
  Monthly = 'Monthly',
  Custom = 'Custom'
}

export interface ScheduleState {
  option: OptionType;
  day?: string;
  month?: string;
  time?: string;
  minutes?: string;
  addedTime?: string;
}
