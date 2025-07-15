import React, { createElement, useState } from 'react';
import UserChipInput from '.';
import Box from '../Box';
// import mdx from './UserChipInput.stories.mdx';
import { user } from '../IconLib';
import list, { userListMap, disabledUsersMap } from './mockData';

export default {
  title: 'Templates/UserChipInput',
  component: UserChipInput,
};

export const defaultPicker = () =>
  createElement(() => {
    const [userList, setUserList] = useState([]);

    const handleIconClick = () => {};

    const updateList = (ids) => {
      setUserList([...ids]);
    };

    return (
      <Box maxWidth="400px">
        <UserChipInput
          backgroundColor="#f8f8fa"
          chipViewId="chipViewID"
          disabledUsersMap={disabledUsersMap}
          icon={user}
          iconClicked={() => {
            handleIconClick();
          }}
          inputFieldId="userListInputFeedbackFor"
          itemKey="id"
          list={list}
          noBorder
          onListUpdate={updateList}
          placeholder="Type or search for the employee’s name"
          selectedList={userList}
          userListMap={userListMap}
        />
      </Box>
    );
  });

// defaultPicker.story = {
//   parameters: { docs: { disable: false, page: mdx } },
// };
