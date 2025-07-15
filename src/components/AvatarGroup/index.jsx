import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from '../Box';
import Text from '../Text';
import Avatar, { avatarPropTypes } from '../Avatar';

const AvatarGroupStyled = styled(Box)`
  display: flex;

  .avatarContainer:not(:first-of-type) {
    border: 1px solid #ffffff;
    margin-left: -8px;
  }
  .groupedAvatar {
    border-radius: 50%;
    background: #2f53d7;
    justify-content: center;
    align-items: center;
    color: white;
    display: flex;
    position: relative;
  }
  .moreContainer {
    margin-left: 8px;
    color: #72737d;
    align-self: center;
  }
`;

const AvatarGroup = React.memo(function AvatarGroup({
  usersList,
  showMax = usersList.length,
  showGroupedAvatarsCount,
  avatarSize,
  avatarShape,
  ...rest
}) {
  const groupedAvatarsSize = usersList.length - showMax;
  const avatarNameTextTypeMapper = {
    xl: 'title1',
    l: 'button',
    m: 'button',
    s: 'label'
  };
  return (
    <AvatarGroupStyled {...rest}>
      {usersList.slice(0, showMax).map(user => (
        <Avatar
          className="note14 avatarContainer"
          {...user}
          shape={user.shape || avatarShape}
          size={user.size || avatarSize}
        />
      ))}
      {showGroupedAvatarsCount && groupedAvatarsSize > 0 ? (
        <Text
          className="moreContainer"
          type={avatarNameTextTypeMapper[avatarSize.toLowerCase()]}
        >
          + {groupedAvatarsSize} more
        </Text>
      ) : null}
    </AvatarGroupStyled>
  );
});

AvatarGroup.propTypes = {
  /**
   * Shape of all avatars, default to 'circle'
   */
  avatarShape: PropTypes.string,
  /**
   * Size of all avatars, default to 's'
   */
  avatarSize: PropTypes.string,
  /**
   * Show count of grouped avatars what are not shown, default to false
   */
  showGroupedAvatarsCount: PropTypes.bool,
  /**
   * How many avatars to be shown, default to length of array
   */
  showMax: PropTypes.number,
  /**
   * From where to start showing avatars from list, default to index 0
   */
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ...avatarPropTypes
    })
  )
};

AvatarGroup.displayName = 'AvatarGroup';

AvatarGroup.defaultProps = {
  avatarShape: 'circle',
  avatarSize: 's',
  showGroupedAvatarsCount: false,
  showMax: undefined,
  usersList: []
};

export default AvatarGroup;
