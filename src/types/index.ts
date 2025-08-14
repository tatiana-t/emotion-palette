export interface IQuestion {
  id: string;
  text: string;
}

export interface IQAnswer {
  id: string;
  text: string;
  answer: string;
}

export interface IColor {
  colorId: string;
  date: string;
  color: string;
  description: IQAnswer[];
  emotion: string;
}

// export type IDraftColor = IColorData & {
//   draftId: string;
// };

// export type ISavedColor = IColorData & {
//   id: string;
// };

// export type IColor = IDraftColor | ISavedColor;
