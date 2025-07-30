export interface IQuestion {
  id: string;
  text: string;
}

export interface IQAnswer {
  id: string;
  text: string;
  answer: string;
}

export interface IEmotion {
  id?: string;
  date: string;
  color: string;
  description: IQAnswer[];
  emotion: string;
}
