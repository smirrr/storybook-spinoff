import styled from "styled-components";
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  compose,
} from "styled-system";
import extraConfig from "./config.js";

const systemProps = compose(
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  extraConfig
);

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */
const forwardBoxProps = ["htmlWidth", "htmlHeight", "role", "id"];

const Box = styled("div").attrs((props) => {
  const attrsObject = {};
  forwardBoxProps.forEach((nativeHTMLPropAliasProp) => {
    if (nativeHTMLPropAliasProp in props) {
      attrsObject[nativeHTMLPropAliasProp] = props[nativeHTMLPropAliasProp];
    }
  });
  return attrsObject;
})(systemProps);

Box.displayName = "Box";

export default Box;
