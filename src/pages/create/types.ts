type IStepId = 'ColorPicker' | 'Questions' | 'Emotion';

export interface IStep {
  stepId: IStepId;
  isAnswered: boolean;
  component: React.FC<{ onAnswer: (isAnswered: boolean) => void }>;
}
