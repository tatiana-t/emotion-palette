import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IStoreUI {
  currentStepIdx: number;
  isNextStepAvailable: boolean;
  isPrevStepAvailable: boolean;

  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
  setStepIdx: (idx: number) => void;

  updateNavigationAvailable: (key: Record<'isNextStepAvailable' | 'isPrevStepAvailable', boolean>) => void;

  clearAdding: () => void;
}

const useUIStore = create<IStoreUI>()(
  devtools((set) => ({
    currentStepIdx: 0,
    isNextStepAvailable: false,
    isPrevStepAvailable: false,
    incrementCurrentStep: () => {
      // const stepToAdd = skipSteps === 0 ? 1 : skipSteps;
      return set((state) => ({ currentStepIdx: state.currentStepIdx + 1 }));
    },

    decrementCurrentStep: () => {
      return set((state) => ({ currentStepIdx: state.currentStepIdx - 1 }));
    },

    setStepIdx: (idx) => {
      return set(() => ({ currentStepIdx: idx }));
    },

    updateNavigationAvailable: (obj) => {
      return set(() => ({
        ...obj,
      }));
    },

    clearAdding: () => {
      return set(() => {
        return {
          currentStepIdx: 0,
          isNextStepAvailable: false,
          isPrevStepAvailable: false,
        };
      });
    },
  })),
);

export default useUIStore;
