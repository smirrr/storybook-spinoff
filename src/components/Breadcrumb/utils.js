import { Children, isValidElement } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const cleanChildren = children => {
  return Children.toArray(children).filter(child => isValidElement(child));
};
