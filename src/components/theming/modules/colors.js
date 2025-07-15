import { css } from "styled-components";
import Color from "color";

export const get = (color, hue) => `${color}.${hue}`;

export const addOpacity = (color, opacity) =>
  Color(color)
    .fade(1 - opacity)
    .rgb()
    .string();

export const addWhite = (color, opacity) => {
  return Color(color).mix(Color("#fff"), opacity).hex();
};

export const addBlack = (color, opacity) =>
  Color(color).mix(Color("#000"), opacity).hex();

export const isDarkColor = (color) => Color(color).isDark();

export const generateAlphaColors = (color) => ({
  900: addOpacity(color, 0.92),
  800: addOpacity(color, 0.8),
  700: addOpacity(color, 0.6),
  600: addOpacity(color, 0.48),
  500: addOpacity(color, 0.38),
  400: addOpacity(color, 0.24),
  300: addOpacity(color, 0.16),
  200: addOpacity(color, 0.12),
  100: addOpacity(color, 0.08),
  50: addOpacity(color, 0.04),
});

// TODO: Figure out how to fix this error from this function
/* eslint-disable consistent-return */

export const colorEmphasis = (color, emphasis) => {
  switch (emphasis) {
    case "high":
      return color;
    case "medium":
      return generateAlphaColors(color)[700];
    case "low":
      return generateAlphaColors(color)[500];
    case "lowest":
      return generateAlphaColors(color)[300];
    default:
  }
};

export const generateStripe = ({
  size = "1rem",
  color = "rgba(255, 255, 255, 0.15)",
}) => css`
  background-image: linear-gradient(
    45deg,
    ${color} 25%,
    transparent 25%,
    transparent 50%,
    ${color} 50%,
    ${color} 75%,
    transparent 75%,
    transparent
  );
  background-size: ${size} ${size};
`;

const colors = {
  blue: {
    highlights_blue: "#ebf6ff",
    10: "#1F2E64",
    20: "#182272",
    50: "#2F53D7",
    60: "#4B68E8",
    80: "#95A3FB",
    90: "#E5F1FF",
    100: "#EBF6FF",
  },
  green: {
    20: "#135D0D",
    50: "#1DB510",
    60: "#39CA2C",
    80: "#84E57C",
    100: "#F2FFF5",
  },
  grey: {
    10: "#202124",
    20: "#6C6D6F",
    30: "#72737D",
    50: "#ADADAE",
    70: "#C8C9D1",
    80: "#EAEBF0",
    90: "#F8F8FA",
    100: "#FFFFFF",
  },
  red: {
    20: "#751818",
    40: "#CB202D",
    50: "#DF2E2E",
    60: "#EE4B4B",
    80: "#FF9696",
    100: "#FFF2F2",
  },
  yellow: {
    20: "#886412",
    50: "#F9B312",
    80: "#FFE58E",
    100: "#FFF8DB",
  },
};

// Aliasing
colors.primary = colors.blue;
colors.positive = colors.green;
colors.basic = colors.grey;
colors.negative = colors.red;
colors.accent = colors.yellow;

colors.link = colors.primary["50"];
colors.divider = colors.basic["80"];

colors.brand = {
  primary: colors.negative["40"],
  secondary: colors.primary["10"],
};

colors.background = {
  light: colors.basic["100"],
  dark: colors.basic["90"],
};

colors.text = {
  highEmphasis: colors.basic["10"],
  normalEmphasis: colors.basic["20"],
  lowEmphasis: colors.basic["50"],
  onDark: colors.basic["100"],
};

colors.buttons = {
  basic: {
    default: colors.basic["100"],
    hover: colors.basic["90"],
  },
  primary: {
    default: colors.primary["50"],
    active: colors.primary["20"],
    hover: colors.primary["60"],
    disabled: colors.primary["80"],
  },
  negative: {
    default: colors.negative["50"],
    active: colors.negative["20"],
    hover: colors.negative["60"],
  },
  positive: {
    default: colors.positive["50"],
    active: colors.positive["20"],
    hover: colors.positive["60"],
  },
};

colors.listItem = {
  hover: colors.primary["100"],
  hoverAlt: colors.primary["90"],
};

colors.pageOverlay = "rgba(0,0,0,0.5)";

export { colors };
