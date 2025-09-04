import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IColor } from 'src/types';
// import questionList from 'src/data/questions';

type IInitialState = Pick<IColor, 'color' | 'reflection' | 'reflectionType' | 'targetEmotion' | 'compensate' | 'like'>;

interface IStoreData {
  historyList: IColor[];
  today: IInitialState;

  updateToday: (day: Partial<IColor>) => void;

  updateField: (fieldId: string, value: string | { id: string; value: string }[]) => void;

  addHistoryItem: (item: IColor) => void;
  clearTodayAdd: () => void;

  setHistory: (list: IColor[]) => void;
}

const initialState: IInitialState = {
  color: '',
  reflection: [],
  reflectionType: '',
  targetEmotion: '',
  compensate: '',
  like: '',
};

const useDataStore = create<IStoreData>()(
  devtools((set) => ({
    historyList: [],
    today: { ...initialState },

    updateToday: (day) =>
      set((state) => {
        return { today: { ...state.today, ...day } };
      }),

    updateField: (id, value) => {
      set((state) => {
        return {
          today: { ...state.today, [id]: value },
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
