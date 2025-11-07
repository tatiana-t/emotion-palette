import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IColor } from 'src/types';
// import questionList from 'src/data/questions';

type IInitialState = Pick<IColor, 'color' | 'reflection' | 'reflectionType' | 'targetEmotion' | 'compensate' | 'like'>;

interface IStoreData {
  historyList: IColor[];
  today: IInitialState;
  currentColor: IColor | null;
  count: number;

  historyScrollPosition: number;

  updateToday: (day: Partial<IColor>) => void;

  updateField: (fieldId: string, value: string | { id: string; value: string }[]) => void;

  addHistoryItem: (item: IColor) => void;
  clearTodayAdd: () => void;

  setHistory: (list: IColor[]) => void;
  setCurrentColor: (color: IColor | null) => void;
  setCount: (count: number) => void;
  setHistoryScrollPosition: (scrollPosition: number) => void;
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
    currentColor: null,
    count: 0,
    historyScrollPosition: 0,
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

    setHistory: (list) => {
      return set(() => {
        return {
          historyList: list,
        };
      });
    },

    setCurrentColor: (currentColor) => {
      return set(() => {
        return { currentColor };
      });
    },

    setCount: (count) => {
      return set(() => {
        return { count };
      });
    },

    setHistoryScrollPosition: (historyScrollPosition) => {
      return set(() => {
        return { historyScrollPosition };
      });
    },
  })),
);

export default useDataStore;
