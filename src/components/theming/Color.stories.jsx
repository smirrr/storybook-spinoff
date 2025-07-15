import React from "react";
import PropTypes from "prop-types";
import Box from "../Box";
import Text from "../Text";
import defaultTheme from "./defaultTheme";
import PseudoBox from "../PseudoBox";
// import { useTheme } from "../theming";

export default {
  title: "Tokens/Color",
  subtitle: "detailed TODO",
};

// TODO: (Nice to have) an understanding of what text can be used on what color to help with AvatarBackgroundGeneration

const basicColorSet = ["blue", "green", "grey", "red", "yellow"];
const namedColorSet = ["basic", "positive", "negative", "primary"];
const jobColorSet = ["brand", "text", "background", "listItem"];

const ColorChip = ({ col, shade }) => {
  const chip = shade ? `${col}.${shade}` : col;
  return (
    <>
      <Box alignItems="center" display="flex">
        <Box
          bg={chip}
          color="text.normalEmphasis"
          display="inline-block"
          height="blocks.small"
          marginY="size8"
          padding="size16"
          width="blocks.small"
        />
        <PseudoBox display="inline-block" marginX="size16">
          <Text tag="p" type="label">
            Token Name
          </Text>
          <Text tag="p" type="body">
            {chip}
          </Text>
        </PseudoBox>
        <PseudoBox display="inline-block">
          <Text tag="p" type="label">
            Hex Number
          </Text>
          {shade ? (
            <Text tag="p" type="body">
              {defaultTheme.colors[col][shade]}
            </Text>
          ) : (
            <Text tag="p" type="body">
              {defaultTheme.colors[col]}
            </Text>
          )}
        </PseudoBox>
      </Box>
    </>
  );
};

ColorChip.propTypes = {
  col: PropTypes.string.isRequired,
  shade: PropTypes.string,
};

ColorChip.defaultProps = {
  shade: null,
};

const SetOfColors = ({ col }) =>
  Object.keys(defaultTheme.colors[col]).map((shade) => (
    <ColorChip col={col} shade={shade} />
  ));

export const fullPalette = () => {
  return basicColorSet.map((col) => (
    <>
      <Text color="text.normalEmphasis" type="header2">
        Shades of {col}
      </Text>
      <SetOfColors col={col} />
      <br />
      <br />
    </>
  ));
};

export const namedColors = () => {
  return namedColorSet.map((col) => (
    <>
      <Text color="text.normalEmphasis" type="header2">
        {col} colors
      </Text>
      <SetOfColors col={col} />
      <br />
      <br />
    </>
  ));
};

export const colorsWithJobs = () => {
  const setOfColorsWithJobs = jobColorSet.map((col) => (
    <>
      <Text color="text.normalEmphasis" type="header2">
        Shades of {col}
      </Text>
      <SetOfColors col={col} />
      <br />
      <br />
    </>
  ));

  setOfColorsWithJobs.push(
    <>
      <Text color="text.normalEmphasis" type="header2">
        Link Color
      </Text>
      <ColorChip col="link" />
      <br />
      <br />
    </>
  );

  setOfColorsWithJobs.push(
    <Box marginBottom="size32">
      <Text color="text.normalEmphasis" type="header2">
        Divider Color
      </Text>
      <ColorChip col="divider" />
    </Box>
  );

  // TODO: Add all the variations of button colors

  return setOfColorsWithJobs;
};
