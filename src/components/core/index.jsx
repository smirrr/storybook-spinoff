import React from 'react';
import GlobalStyle from './GlobalStyle';

/**
 * Add design-system-wide components here. Eg - global styles, font loading, etc.
 * @returns React Component to be called before adding any components from the design system
 */
const Core = () => {
  return <GlobalStyle />;
};

export default Core;
