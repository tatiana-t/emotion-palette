import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import list from './testData';
import type { IEmotion } from 'src/types';
import questionList from 'src/data/questions';
// const questionsList: IQuestion[] = [
//   {
//     id: '1',
//     text: 'Запишите свои ассоциации с выбранным цветом',
//     answer: '',
//   },
//   {
//     id: '2',
//     text: 'Что этот цвет хочет вам сказать?',
//     answer: '',
//   },
//   {
//     id: '3',
//     text: 'Какое настроение у этого цвета?',
//     answer: '',
//   },
// ];

const initialDay: IEmotion = {
  date: '',
  color: '',
  description: [],
  emotion: '',
};

interface IStore {
  historyList: IEmotion[];
  today: IEmotion;

  currentStep: number;
  isNextStepAvailable: boolean;
  isPrevStepAvailable: boolean;

  updateNavigationAvailable: (key: Record<'isNextStepAvailable' | 'isPrevStepAvailable', boolean>) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;

  updateToday: (day: Partial<IEmotion>) => void;
  updateTodayDescription: (id: string, answer: string) => void;

  addHistoryItem: (item: IEmotion) => void;
  clearTodayAdd: () => void;
}

const useStore = create<IStore>()(
  devtools((set) => ({
    historyList: list,
    today: { ...initialDay },
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
        return { historyList: [...state.historyList, { ...day, id: dayId, date: dayDate }] };
      });
    },
    clearTodayAdd: () => {
      return set(() => {
        return {
          currentStep: 0,
          today: { ...initialDay },
          isNextStepAvailable: false,
          isPrevStepAvailable: false,
        };
      });
    },
  })),
);

export default useStore;
