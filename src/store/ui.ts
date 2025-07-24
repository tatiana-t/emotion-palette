import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// interface IQuestion {
//   id: string;
//   text: string;
//   answer: string;
// }
interface IStoreUI {
  currentStep: number;
  incrementCurrentStep: () => void;
}

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

const useUIStore = create<IStoreUI>()(
  devtools((set) => ({
    currentStep: 0,
    // questionsList,

    incrementCurrentStep: () => {
      return set((state) => ({ currentStep: state.currentStep + 1 }));
    },
  })),
);

export default useUIStore;
