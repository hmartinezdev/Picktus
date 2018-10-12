import { ThunkAction } from 'redux-thunk';
import { IDisplayState } from './display.type';

export type ThunkResult<R> = ThunkAction<R, IDisplayState, undefined, DisplayActions>;

export enum TypeKeys {
  DISPLAY_LOADER = 'DISPLAY_LOADER',
}

export interface DisplayLoader {
  type: TypeKeys.DISPLAY_LOADER;
  show: boolean;
}

export const displayLoader = (show: boolean): DisplayLoader => ({
  show,
  type: TypeKeys.DISPLAY_LOADER,
});

export type DisplayActions = DisplayLoader;
