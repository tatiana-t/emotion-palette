import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IColor } from 'src/types';
import questionList from 'src/data/questions';

const initialState: Pick<IColor, 'color' | 'description' | 'emotion'> = {
  color: '',
  description: [],
  emotion: '',
};

interface IStoreData {
  historyList: IColor[];
  today: Pick<IColor, 'color' | 'description' | 'emotion'>;

  updateToday: (day: Partial<IColor>) => void;
  updateTodayDescription: (id: string, answer: string) => void;

  addHistoryItem: (item: IColor) => void;
  clearTodayAdd: () => void;

  setHistory: (list: IColor[]) => void;
}

const useDataStore = create<IStoreData>()(
  devtools((set) => ({
    historyList: [],
    today: { ...initialState },

    updateToday: (day: IColor) =>
      set((state) => {
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
    addHistoryItem: (color: IColor) => {
      return set((state) => {
        return { historyList: [color, ...state.historyList] };
      });
    },
    clearTodayAdd: () => {
      return set(() => {
        return {
          today: { ...initialState },
        };
      });
    },

    setHistory: (list: IColor[]) => {
      return set(() => {
        return {
          historyList: list,
        };
      });
    },
  })),
);

export default useDataStore;
