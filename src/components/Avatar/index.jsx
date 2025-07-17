/* eslint-disable react/jsx-props-no-spreading */
// TODO: Prevent prop-spreading
import React from 'react';
import PropTypes from 'prop-types';
import { useAvatarStyle, getInitials } from './utils.js';
import { useHasImageLoaded } from '../Image/index.jsx';
import Box from '../Box/index.js';
import Text from '../Text/index.jsx';

export const avatarSizes = ['xl', 'x', 'l', 'm', 's', 'XL', 'X', 'L', 'M', 'S'];
export const avatarShapes = ['square', 'circle'];

export const AvatarBadge = ({ children, ...props }) => {
  return (
    <Box
      bg="accent.50"
      bottom="-10px"
      position="absolute"
      px="size6"
      py="size2"
      {...props}
    >
      <Text type="label">{children}</Text>
    </Box>
  );
};

AvatarBadge.propTypes = {
  /**
   * Text to be displayed on the badge
   */
  children: PropTypes.string.isRequired
};

export const AvatarName = ({ name, size, ...props }) => {
  const avatarNameTextTypeMapper = {
    xl: 'title1',
    l: 'button',
    m: 'button',
    s: 'label'
  };
  return (
    <Box
      alignItems="center"
      aria-label={name}
      fontWeight="medium"
      justifyContent="center"
      textAlign="center"
      textTransform="uppercase"
      {...props}
    >
      <Text type={avatarNameTextTypeMapper[size]}>
        {name ? getInitials(name) : null}
      </Text>
    </Box>
  );
};

AvatarName.propTypes = {
  /**
   * Name of the user to derive initials from
   */
  name: PropTypes.string,
  /**
   * Avatar size; This is a derived prop
   */
  size: PropTypes.oneOf(avatarSizes)
};

AvatarName.defaultProps = {
  name: null,
  size: 'm'
};

export const DefaultAvatar = props => (
  <Box size="100%" {...props}>
    <svg fill="#fff" role="img" viewBox="0 0 128 128">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </Box>
);

// eslint-disable-next-line react/prop-types
const AvatarChildren = ({ src, name, objectFit, shape, size }) => {
  const hasLoaded = useHasImageLoaded({ src });
  if (src && hasLoaded) {
    return (
      <Box
        alt={name}
        as="img"
        borderRadius={shape === 'square' ? '0%' : 'full'}
        objectFit={objectFit}
        size="100%"
        src={src}
      />
    );
  }

  if (src && !hasLoaded) {
    if (name) {
      return <AvatarName name={name} size={size} />;
    }
    return <DefaultAvatar />;
  }

  if (!src && name) {
    return <AvatarName name={name} size={size} />;
  }

  return <DefaultAvatar />;
};

// Where is Avatar used? What are some things to keep in mind when using it?
const Avatar = ({ shape, size, name, src, badgeText, objectFit, ...rest }) => {
  const sizeInLowerCase = size?.toLowerCase();
  const avatarStyleProps = useAvatarStyle({
    name,
    size
  });

  return (
    <Box
      alignItems="center"
      borderRadius={shape === 'square' ? '0%' : 'full'}
      display="flex"
      justifyContent="center"
      position="relative"
      verticalAlign="top"
      {...avatarStyleProps}
      {...rest}
    >
      <AvatarChildren
        name={name}
        objectFit={objectFit}
        shape={shape}
        size={sizeInLowerCase}
        src={src}
      />
      {badgeText &&
        badgeText.length &&
        ['xl', 'l'].indexOf(sizeInLowerCase) > -1 && (
        <AvatarBadge>{badgeText}</AvatarBadge>
      )}
    </Box>
  );
};

export const avatarPropTypes = {
  /**
   * The text that the badge will contain. Will only show up if Avatar is xl or l.
   */
  badgeText: PropTypes.string,
  /**
   * The name associated with the Avatar, useful for when the user hasn't uploaded their image yet.
   */
  name: PropTypes.string,
  /**
   * Objectfit property for image
   */
  objectFit: PropTypes.string,
  /**
   * The Shape of the avatar icon
   */
  shape: PropTypes.oneOf(avatarShapes),
  /**
   * The size of the avatar icon
   */
  size: PropTypes.oneOf(avatarSizes),
  /**
   * The image that the Avatar will contain
   */
  src: PropTypes.string
};

Avatar.propTypes = avatarPropTypes;

Avatar.defaultProps = {
  badgeText: null,
  name: null,
  objectFit: 'cover',
  shape: 'circle',
  size: avatarSizes[2],
  src: null
};

Avatar.displayName = 'Avatar';

export default Avatar;
