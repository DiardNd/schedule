const cronRegex =
  //eslint-disable-next-line
  /^(\*|([0-5]?\d)|\*\/([0-5]?\d)|([0-5]?\d),([0-5]?\d)) (\*|([0-9]|2[0-3]|[0-1][0-9])|([0-9]|2[0-3]|[0-1][0-9]),([0-9]|2[0-3]|[0-1][0-9])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])) (\*|([0-6]))$/;
const intervalRegex = /\/\*[0-5]?\d$|\/\*59$/;

export const checkIsCronValid = (cron: string) => {
  if (!cron) {
    return 'You must fill in your cron';
  } else if (!cronRegex.test(cron)) {
    return 'Please enter a valid cron in the minutes [0-59 or *] hour [0-23 or *] day of mont [1-31 or *] month [1-12 или *] day of week [0-6 or *] format ';
  }

  return null;
};
