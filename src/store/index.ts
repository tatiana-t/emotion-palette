import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IDay {
  date: string;
  color: string;
  description: Record<string, string>;
  emotion: string;
}

const initialDay: IDay = {
  date: '',
  color: '',
  description: {},
  emotion: '',
};

interface IStore {
  historyList: IDay[];
  today: IDay;

  updateToday: (day: Partial<IDay>) => void;
  updateAnswer: (qId: string, answer: string) => void;
}

// interface IData {
//   data: IStore;
//   ui: {};
// }
interface IStoreUI {
  currentStep: number;
  incrementStep: () => void;
}
const useStore = create<IStore & IStoreUI>()(
  devtools((set) => ({
    historyList: [],
    today: { ...initialDay },

    updateToday: (day: IDay) =>
      set((state) => {
        if (!state.today.date) {
          const date = new Date();
          day.date = date.toLocaleDateString();
        }
        return { today: { ...state.today, ...day } };
      }),

    updateAnswer: (qId: string, answer: string) =>
      set(({ today }) => {
        today.description[qId] = answer;

        return {
          today: { ...today },
        };
      }),

    currentStep: 0,

    incrementCurrentStep: () => {
      return set((state) => ({ currentStep: state.currentStep + 1 }));
    },
  })),
);

export default useStore;
