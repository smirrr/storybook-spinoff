/* eslint-disable no-plusplus,no-bitwise */
import { useTheme } from "../theming/index.jsx";

function string2Hex(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash;
  }
  let color = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 255;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
}

export const useAvatarStyle = ({ size, name }) => {
  const bg = name ? string2Hex(name) : "white";
  const color = "basic.100";
  const { sizes } = useTheme();

  return {
    size: sizes.avatars[size?.toLowerCase()],
    bg,
    color,
  };
};

export const getInitials = (name) => {
  const [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }
  return firstName.charAt(0);
};
