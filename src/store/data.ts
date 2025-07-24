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

interface IDay {
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
  incrementCurrentStep: () => void;

  updateToday: (day: Partial<IDay>) => void;
  // updateAnswer: (qId: string, answer: string) => void;
  updateTodayDescription: (id: string, answer: string) => void;

  addHistoryItem: (item: IDay) => void;
  clearTodayAdd: () => void;
}

const useStore = create<IStore>()(
  devtools((set) => ({
    historyList: [],
    today: structuredClone(initialDay),

    currentStep: 0,
    incrementCurrentStep: () => {
      return set((state) => ({ currentStep: state.currentStep + 1 }));
    },

    updateToday: (day: IDay) =>
      set((state) => {
        if (!state.today.id) {
          const date = new Date();
          day.date = date.toLocaleDateString();

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
