// Because we need to add keys explicitly , and also to ensure readability of the aliasing, we will disable array-destructuring preference
/* eslint-disable prefer-destructuring */
/**
 * The default theme to be applied. This is also where common design-system variables will live.
 * This should ideally follow conventions from https://system-ui.com/theme/
 */

import { borders, radii } from "./modules/borders";
import { colors } from "./modules/colors";

const fontSizes = [10, 12, 14, 16, 20, 24, 32, 40, 56];
// Aliasing
fontSizes.size10 = fontSizes[0];
fontSizes.size12 = fontSizes[1];
fontSizes.size14 = fontSizes[2];
fontSizes.size16 = fontSizes[3];
fontSizes.size20 = fontSizes[4];
fontSizes.size24 = fontSizes[5];
fontSizes.size32 = fontSizes[6];
fontSizes.size40 = fontSizes[7];
fontSizes.size56 = fontSizes[8];

const lineHeights = [
  "12px",
  "16px",
  "20px",
  "24px",
  "28px",
  "32px",
  "40px",
  "48px",
  "64px",
];
// Aliasing
lineHeights.size12 = lineHeights[0];
lineHeights.size16 = lineHeights[1];
lineHeights.size20 = lineHeights[2];
lineHeights.size24 = lineHeights[3];
lineHeights.size28 = lineHeights[4];
lineHeights.size32 = lineHeights[5];
lineHeights.size40 = lineHeights[6];
lineHeights.size48 = lineHeights[7];
lineHeights.size64 = lineHeights[8];

const fontWeights = [400, 500, 600];
// Aliasing
fontWeights.normal = fontWeights[0];
fontWeights.medium = fontWeights[1];
fontWeights.bold = fontWeights[2];

const letterSpacings = ["-0.02em", 0, "0.02em"];
// Aliasing
letterSpacings.small = letterSpacings[0];
letterSpacings.normal = letterSpacings[1];
letterSpacings.medium = letterSpacings[2];

const sizes = [2, 4, 8, 16, 24, 32, 48, 56, 64, 72, 80, 88, 96, 100];
sizes.modalTitleIcon = 20;
sizes.blocks = {
  small: 50,
};
sizes.avatars = {
  xl: 136,
  x: 96,
  l: 40,
  m: 32,
  s: 24,
};
sizes.icons = {
  xl: 136,
  l: 40,
  m: 24,
  s: 16,
  xs: 12,
};
sizes.fontSizes = { ...fontSizes }; // TO ENABLE SIZING ELEMENTS ACCORDING TO FONT SIZES OF TEXT ELEMENTS THAT GO WITH THEM (SEE - SPINNER AND ICONS FOR BUTTONS)
sizes.icons.default = sizes.icons.s;

const space = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
space.size0 = space[0];
space.size2 = space[1];
space.size4 = space[2];
space.size6 = space[3];
space.size8 = space[4];
space.size10 = space[5];
space.size12 = space[6];
space.size14 = space[7];
space.size16 = space[8];
space.size18 = space[9];

const baseShadow =
  "0px 1px 2px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.25)";
const hoverShadow =
  "0px 1px 2px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.25), 0px 4px 8px rgba(9, 30, 66, 0.15)";
const activeShadow =
  "0px 1px 2px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.25), 0px 4px 8px rgba(9, 30, 66, 0.15)";
const focusShadow = `0 0 0 2px ${colors.primary["80"]}, 0px 1px 2px rgba(9,30,66,0.2), 0px 0px 1px rgba(9,30,66,0.25)`;
const overlayShadow =
  "0px 1px 4px rgba(0, 0, 0, 0.5), 0px 32px 32px rgba(0, 0, 0, 0.3)";

const shadows = {
  base: baseShadow,
  hover: hoverShadow,
  active: activeShadow,
  focus: focusShadow,
  overlay: overlayShadow,
  focusAlt:
    "0px 1px 3px rgba(47, 83, 215, 0.25), 0px 0px 1px rgba(47, 83, 215, 0.0008)",
  hoverAlt:
    "0px 1px 3px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.0008)",
  primary: `${baseShadow} ${colors.primary["20"]}`,
  basic: `${baseShadow} ${colors.basic["20"]}`,
  positive: `${baseShadow} ${colors.positive["20"]}`,
  negative: `${baseShadow} ${colors.negative["20"]}`,
  accent: `${baseShadow} ${colors.accent["20"]}`,
};

const zIndices = [-5, -1, 0, 5, 99, 100];

const defaultTheme = {
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  sizes,
  radii,
  shadows,
  borders,
  zIndices,
};

export default defaultTheme;
