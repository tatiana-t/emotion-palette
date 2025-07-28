import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IQuestion {
  id: string;
  text: string;
  answer: string;
}

const questionsList: IQuestion[] = [
  {
    id: '1',
    text: 'Запишите свои ассоциации с выбранным цветом',
    answer: '',
  },
  {
    id: '2',
    text: 'Что этот цвет хочет вам сказать?',
    answer: '',
  },
  {
    id: '3',
    text: 'Какое настроение у этого цвета?',
    answer: '',
  },
];

export interface IDay {
  id?: string;
  date: string;
  color: string;
  description: IQuestion[];
  emotion: string;
}

const initialDay: IDay = {
  date: '',
  color: '',
  description: questionsList,
  emotion: '',
};

interface IStore {
  historyList: IDay[];
  today: IDay;

  currentStep: number;
  isNextStepAvailable: boolean;
  isPrevStepAvailable: boolean;
  updateNavigationAvailable: (key: Record<'isNextStepAvailable' | 'isPrevStepAvailable', boolean>) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;

  updateToday: (day: Partial<IDay>) => void;
  // updateAnswer: (qId: string, answer: string) => void;
  updateTodayDescription: (id: string, answer: string) => void;

  addHistoryItem: (item: IDay) => void;
  clearTodayAdd: () => void;
}

const useStore = create<IStore>()(
  devtools((set) => ({
    historyList: [
      {
        date: '28.07.2025',
        color: 'rgb(10, 100, 195)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: '',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: 'asdfs',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Радость',
        id: '77',
      },
      {
        date: '28.07.2025',
        color: 'rgb(103, 173, 247)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: 'zxcvzxcv',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: 'asdfasdf',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Радость',
        id: '41',
      },
      {
        date: '28.07.2025',
        color: 'rgb(10, 195, 75)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: 'zdfgdfgd',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: 'xfgdfgf',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Радость',
        id: '54',
      },
      {
        date: '28.07.2025',
        color: 'rgb(201, 103, 247)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: 'fhdfgdhfg',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: '',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Печаль',
        id: '29',
      },
      {
        date: '28.07.2025',
        color: 'rgb(201, 103, 247)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: 'fhdfgdhfg',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: '',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Печаль',
        id: '79',
      },
      {
        date: '28.07.2025',
        color: 'rgb(201, 103, 247)',
        description: [
          {
            id: '1',
            text: 'Запишите свои ассоциации с выбранным цветом',
            answer: 'fhdfgdhfg',
          },
          {
            id: '2',
            text: 'Что этот цвет хочет вам сказать?',
            answer: '',
          },
          {
            id: '3',
            text: 'Какое настроение у этого цвета?',
            answer: '',
          },
        ],
        emotion: 'Печаль',
        id: '89',
      },
    ],
    today: structuredClone(initialDay),

    currentStep: 0,
    isNextStepAvailable: false,
    isPrevStepAvailable: false,
    incrementCurrentStep: () => {
      return set((state) => ({ currentStep: state.currentStep + 1 }));
    },
    decrementCurrentStep: () => {
      return set((state) => ({ currentStep: state.currentStep - 1 }));
    },
    updateNavigationAvailable: (obj) => {
      return set(() => ({
        ...obj,
      }));
    },

    updateToday: (day: IDay) =>
      set((state) => {
        if (!state.today.id) {
          const date = new Date();
          day.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

          day.id = (Math.random() * 100).toFixed();
        }
        return { today: { ...state.today, ...day } };
      }),

    // updateAnswer: (qId: string, answer: string) =>
    //   set(({ today }) => {
    //     today.description[qId] = answer;

    //     return {
    //       today: { ...today },
    //     };
    //   }),

    updateTodayDescription: (id: string, answer: string) => {
      return set((state) => {
        const list = state.today.description.map((item) => {
          if (item.id === id) {
            item.answer = answer;
          }
          return item;
        });
        return {
          today: {
            ...state.today,
            description: list,
          },
        };
      });
    },

    addHistoryItem: (day: IDay) => {
      return set((state) => {
        return { historyList: [...state.historyList, day] };
      });
    },

    clearTodayAdd: () => {
      return set(() => {
        return {
          currentStep: 0,
          today: structuredClone(initialDay),
        };
      });
    },
  })),
);

export default useStore;
