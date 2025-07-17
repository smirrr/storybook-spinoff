import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext,
} from "styled-components";
import defaultTheme from "./defaultTheme.js";

/**
 * Get ThemeProvider with default theme applied
 * @param theme - theme object to extend the default theme with, if necessary
 */
const ThemeProvider = ({ theme, children }) => {
  const computedTheme = { ...defaultTheme, ...theme };
  return (
    <StyledThemeProvider theme={computedTheme}>{children}</StyledThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
};

ThemeProvider.defaultProps = {
  theme: {},
};

ThemeProvider.displayName = "ThemeProvider";

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;
