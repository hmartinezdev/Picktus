import { ComponentClass, ReactElement } from 'react';

export interface IPageProps {
  status: string;
}

export interface Page extends ReactElement<any> {
  type: PageType;
}

export interface PageType extends ComponentClass {
  displayName: string;
}
