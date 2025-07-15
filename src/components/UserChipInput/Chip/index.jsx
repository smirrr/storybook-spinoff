import React from 'react';

import PropTypes from 'prop-types';
import Box from '../../Box';
import Avatar from '../../Avatar';
import Icon from '../../Icon';
import { close } from '../../IconLib';
import ChipStyleContainer from './Chip.styled';

const Chip = props => {
  const {
    showAvatar,
    data,
    _handleChipViewDelete,
    showClear,
    bgColor,
    className,
    border,
    color
  } = props;

  return (
    <ChipStyleContainer
      bgColor={bgColor}
      border={border}
      className={className}
      color={color}
    >
      {showAvatar && (
        <Avatar
          className="chipAvatar"
          name={data.name}
          size="S"
          src={data.image}
        />
      )}

      <Box className="chipLabel label14">{data.name}</Box>

      {showClear && (
        <Icon
          className="chipDelete"
          icon={close}
          onClick={() => _handleChipViewDelete(data.id)}
        />
      )}
    </ChipStyleContainer>
  );
};

Chip.propTypes = {
  _handleChipViewDelete: () => {},
  bgColor: PropTypes.string,
  border: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  data: {},
  showAvatar: PropTypes.bool,
  showClear: PropTypes.bool
};

Chip.defaultProps = {
  _handleChipViewDelete: () => {},
  bgColor: '#E1E1E8',
  border: '',
  className: '',
  color: '',
  data: {},
  showAvatar: false,
  showClear: true
};

Chip.displayName = 'Chip';

export default Chip;
