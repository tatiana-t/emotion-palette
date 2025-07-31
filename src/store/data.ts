import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import list from './testData';
import type { IEmotion } from 'src/types';
import questionList from 'src/data/questions';

const initialDay: IEmotion = {
  date: '',
  color: '',
  description: [],
  emotion: '',
};

interface IStoreData {
  historyList: IEmotion[];
  today: IEmotion;

  updateToday: (day: Partial<IEmotion>) => void;
  updateTodayDescription: (id: string, answer: string) => void;

  addHistoryItem: (item: IEmotion) => void;
  clearTodayAdd: () => void;
}

const useDataStore = create<IStoreData>()(
  devtools((set) => ({
    historyList: list,
    today: { ...initialDay },

    updateToday: (day: IEmotion) =>
      set((state) => {
        if (!state.today.id) {
        }
        return { today: { ...state.today, ...day } };
      }),
    updateTodayDescription: (id: string, answer: string) => {
      return set((state) => {
        const descriptionItem = state.today.description.find((item) => item.id === id);
        let list = [];
        if (descriptionItem) {
          list = state.today.description.map((item) => {
            if (item.id === id) {
              item.answer = answer;
            }
            return item;
          });
        } else {
          const text = questionList.find((qItem) => qItem.id === id)!.text;
          list = state.today.description.map((item) => ({ ...item }));
          list.push({ id, text, answer });
        }
        return {
          today: {
            ...state.today,
            description: list,
          },
        };
      });
    },
    addHistoryItem: (day: IEmotion) => {
      return set((state) => {
        const date = new Date();
        const dayDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
        const dayId = (Math.random() * 100).toFixed();
        return { historyList: [{ ...day, id: dayId, date: dayDate }, ...state.historyList] };
      });
    },
    clearTodayAdd: () => {
      return set(() => {
        return {
          today: { ...initialDay },
        };
      });
    },
  })),
);

export default useDataStore;
