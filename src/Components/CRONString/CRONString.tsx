import { ChangeEvent, useState } from 'react';

import { useAppSelector } from '../../hooks';

export const CRONString = () => {
  const interval = useAppSelector((state) => state.scheduleEditor.minutes);
  const day = useAppSelector((state) => state.scheduleEditor.day);
  const time = useAppSelector((state) => state.scheduleEditor.time);
  const month = useAppSelector((state) => state.scheduleEditor.month);
  const option = useAppSelector((state) => state.scheduleEditor.option);
  const [cronString, setCronString] = useState('');

  const generateCronString = () => {
    let newCronString = '';

    if (option === 'Daily') {
      newCronString = `*/${interval} * * * *`;
    } else if (option === 'Weekly') {
      newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * * ${day}`;
    } else if (option === 'Custom') {
      newCronString = `${time!.split(':')[1]} ${time!.split(':')[0]} * ${month} ${day}`;
    }
    return setCronString(newCronString);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCronString(event.target.value);
  };

  return (
    <div>
      <input type="text" value={cronString} onChange={handleInputChange} />
      <button onClick={generateCronString}>TEST</button>
    </div>
  );
};
