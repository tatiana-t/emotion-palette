import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IStoreUI {
  currentStep: number;
  isNextStepAvailable: boolean;
  isPrevStepAvailable: boolean;

  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;

  updateNavigationAvailable: (key: Record<'isNextStepAvailable' | 'isPrevStepAvailable', boolean>) => void;

  clearAdding: () => void;
}

const useUIStore = create<IStoreUI>()(
  devtools((set) => ({
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

    clearAdding: () => {
      return set(() => {
        return {
          currentStep: 0,
          isNextStepAvailable: false,
          isPrevStepAvailable: false,
        };
      });
    },
  })),
);

export default useUIStore;
