import options from 'src/data/options';
import SCREEN_IDS from 'src/data/screenIds';

export interface IQuestion {
  id: string;
  text: string;
  disabled?: boolean;
}

export interface IQAnswer {
  id: string;
  value: string;
}

type IDependencyMap = {
  //IScreenId: options values
  [K in keyof typeof options]: (typeof options)[K][number]['id'];
};

export type IColor = {
  colorId: string;
  date: string;
  color: string;
  reflection: { id: string; value: string }[];
  reflectionType: IDependencyMap[typeof SCREEN_IDS.reflectionType] | ''; //IDependencyMap[typeof SCREEN_IDS.reflectionType][number]['id'];
  targetEmotion: string;

  compensate?: string;
  like?: string;
  yes?: string;
};

export type IIds = (typeof SCREEN_IDS)[keyof typeof SCREEN_IDS];
interface IScreenCommonFields {
  id: IIds;
  title: string;
  actionText?: string;
  dependency?: { id: typeof SCREEN_IDS.reflectionType; value: IDependencyMap[typeof SCREEN_IDS.reflectionType] };
}

export interface ITextScreen extends IScreenCommonFields {
  type: 'text';
}

export interface IText {
  id: string;
  text: string;
}
export interface IMultiTextScreen extends IScreenCommonFields {
  type: 'multitext';
  list: IQuestion[];
}

export interface IExternalComponentScreen extends IScreenCommonFields {
  type: 'ColorPicker' | 'EmotionSelect';
}

export interface IOption {
  id: string;
  text: string;
}

export interface ISelectScreen extends IScreenCommonFields {
  type: 'select';
  options: IOption[];
}

export type IScreen = ISelectScreen | ITextScreen | IMultiTextScreen | IExternalComponentScreen;
