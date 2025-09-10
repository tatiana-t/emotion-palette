import SCREEN_IDS from 'src/data/screenIds';
import type { IOption } from 'src/types';

export default {
  [SCREEN_IDS.reflectionType]: [
    {
      id: 'yes',
      text: 'Соответсвует',
    },
    {
      id: 'compensate',
      text: 'Отражает скорее желаемое состояние',
    },
    {
      id: 'like',
      text: 'Просто понравился цвет',
    },
  ],
} as const satisfies Record<string, IOption[]>;
