/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import Chip from './Chip';
import Box from '../Box';
import Avatar from '../Avatar';
import Text from '../Text';
import Image from '../Image';
import UserChipInputStyled from './UserChipInput.styled';
import { KeyCodes, isEmptyString, filterList } from './utils';

const UserChipInput = React.memo(function UserChipInput(props) {
  const {
    userListMap,
    placeholder,
    icon,
    backgroundColor,
    noBorder,
    inputFieldId,
    chipViewId,
    iconClicked,
    itemKey,
    defaultValue,
    selectedList,
    onListUpdate,
    disabledUsersMap,
    list
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue || '');
  const [renderList, setRenderList] = useState([]);
  const [selectedIds, setSelectedIds] = useState(
    selectedList && selectedList.length ? selectedList : []
  );
  const [containerHeight, setContainerHeight] = useState(null);

  const handleInputBlur = () => {
    setTimeout(() => {
      setRenderList([]);
    }, 200);
  };

  const handleBlur = () => {
    setIsFocused(false);
    handleInputBlur();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = document.getElementById(chipViewId);
      setContainerHeight((container && container.offsetHeight) || 20);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    setSelectedIds(selectedList);
  }, [selectedList]);

  const handleValueChange = e => {
    setValue(e.target.value);

    if (e.target.value.trim() === '') {
      setRenderList([]);
      return;
    }

    let filteredList = filterList(list, e.target.value);
    if (filteredList.length) {
      filteredList = filteredList.filter(
        item => !selectedIds.includes(item[itemKey])
      );
    }

    setRenderList(filteredList);
  };

  const selectItem = (item, isUserDisabled) => {
    if (isUserDisabled) return;
    setSelectedIds([...selectedIds, item[itemKey]]);
    setValue('');
    if (document.getElementById(inputFieldId)) {
      document.getElementById(inputFieldId).focus();
    }

    if (onListUpdate) {
      onListUpdate([...selectedIds, item[itemKey]]);
    }
    setTimeout(() => {
      setRenderList([]);
      const container = document.getElementById(chipViewId);
      setContainerHeight((container && container.offsetHeight) || 20);
    }, 200);
  };

  const handleChipDelete = id => {
    const tempSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
    setSelectedIds(tempSelectedIds);

    if (onListUpdate) {
      onListUpdate(tempSelectedIds);
    }
    if (document.getElementById(inputFieldId)) {
      document.getElementById(inputFieldId).focus();
    }
    setTimeout(() => {
      const container = document.getElementById(chipViewId);
      setContainerHeight((container && container.offsetHeight) || 20);
    }, 200);
  };

  const handleKeyDown = e => {
    // Note: When press "delete / backspace"
    if (
      e.which === KeyCodes.delete &&
      selectedIds.length > 0 &&
      isEmptyString(value)
    ) {
      handleChipDelete(selectedIds[selectedIds.length - 1]);
    }
  };

  return (
    <UserChipInputStyled
      backgroundColor={backgroundColor}
      containerHeight={containerHeight}
      noBorder={noBorder}
    >
      <Box
        className={`chipView text14weight400 ${isFocused ? 'active' : ''}`}
        id={chipViewId}
      >
        {selectedIds.length
          ? selectedIds.map(item => {
            if (!item) return null;
            const user = userListMap[item];
            return (
              <Chip
                _handleChipViewDelete={handleChipDelete}
                data={{
                  image:
                      user.profile_image_url && user.profile_image_url.thumbnail
                        ? user.profile_image_url.thumbnail
                        : null,
                  name: user.name,
                  id: user[itemKey]
                }}
                key={user[itemKey]}
                showAvatar
                showClear
              />
            );
          })
          : ''}
        <input
          className="searchInput"
          height="40px"
          id={inputFieldId}
          onBlur={handleBlur}
          onChange={handleValueChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedIds.length ? '' : placeholder || 'Your input here'
          }
          value={value}
        />
        <Image
          className="inputIcon"
          cursor={iconClicked ? 'pointer' : 'default'}
          onClick={() => (iconClicked ? iconClicked() : {})}
          src={icon}
        />
      </Box>
      {renderList.length ? (
        <Box
          bg="basic.100"
          className="renderListContainer"
          color="base.10"
          w="100%"
        >
          {renderList.map(data => {
            let isUserDisabled = false;
            let disabledReason = '';
            if (disabledUsersMap && disabledUsersMap[data[itemKey]]) {
              isUserDisabled = true;
              disabledReason = disabledUsersMap[data[itemKey]].reason;
            }
            return (
              <Tooltip
                arrowSize={5}
                background="#000"
                color="#FFF"
                content={disabledReason}
                direction="down"
                useHover={isUserDisabled}
              >
                <Box
                  alignItems="center"
                  bg="basic.100"
                  className="renderListItem"
                  color="base.10"
                  cursor={isUserDisabled ? 'not-allowed' : 'pointer'}
                  d="flex"
                  key={data[itemKey]}
                  onClick={() => selectItem(data, isUserDisabled)}
                  pb={5}
                  pl={6}
                  pr={6}
                  pt={5}
                >
                  <Avatar
                    name={data.name}
                    shape="circle"
                    size="M"
                    src={
                      data.profile_image_url && data.profile_image_url.thumbnail
                        ? data.profile_image_url.thumbnail
                        : ''
                    }
                  />
                  <Box className="" color="base.10" ml={6}>
                    <Text type="tag">{data.name}</Text>
                    <Text type="timestamp">{data.email}</Text>
                  </Box>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      ) : (
        ''
      )}
    </UserChipInputStyled>
  );
});

UserChipInput.propTypes = {
  backgroundColor: '',
  chipViewId: 'id',
  defaultValue: '',
  disabledUsersMap: {},
  icon: '',
  iconClicked: () => {},
  inputFieldId: 'id',
  itemKey: 'id',
  list: [],
  noBorder: false,
  onListUpdate: () => {},
  placeholder: 'placeholder',
  selectedList: [],
  userListMap: {}
};

UserChipInput.defaultProps = {
  backgroundColor: '',
  chipViewId: 'id',
  defaultValue: '',
  icon: '',
  iconClicked: () => {},
  inputFieldId: 'id',
  itemKey: 'id',
  list: [],
  noBorder: false,
  onListUpdate: () => {},
  placeholder: 'placeholder',
  selectedList: [],
  userListMap: {},
  disabledUsersMap: {}
};

UserChipInput.displayName = 'UserChipInput';

export default UserChipInput;
