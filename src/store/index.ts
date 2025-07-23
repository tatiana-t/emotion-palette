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

  updateCurrentDay: (day: Partial<IDay>) => void;
  updateAnswer: (qId: string, answer: string) => void;
}
const useStore = create<IStore>()(
  devtools((set) => ({
    historyList: [],
    today: { ...initialDay },

    updateCurrentDay: (day: IDay) =>
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
  })),
);

export default useStore;
