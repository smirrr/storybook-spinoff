import React, { useState, useEffect, useRef } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import Proptypes from 'prop-types';
import { SimpleButton } from '../Button';
import Avatar from '../Avatar';

import {
  filterListByEitherOfTwoParams,
  getUserIdsFromMentionString,
  adjustInputHeight
} from './utils';
import StyledMentionsInputField from './MentionsInputField.styled';

const MentionsInputField = props => {
  const {
    mentionContainerRef,
    functionToAddViewInsideTextBoxBottom,
    functionForViewAboveTextBox,
    functionForViewAboveButton,
    onMentionedUsersChange,
    initialValue,
    onValueChange,
    inputReference,
    allUsers,
    onCancelClick,
    onConfirmClick,
    inputPlaceholder,
    isButtonAlwaysVisible,
    value,
    additionalConditionToEnableConfirmButton
  } = props;
  const [showButtons, setShowButtons] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue || '');
  const mentionParentRef = useRef(null);

  const handleMentionedUserChange = users => {
    onMentionedUsersChange(users);
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const updateValueAndMentions = val => {
    const userIds = getUserIdsFromMentionString(value);
    if (userIds.length > 0) {
      const filteredUsers = allUsers.filter(user => userIds.includes(user.id));
      handleMentionedUserChange(filteredUsers);
    }
    onValueChange(val);
    if (value.length > 0) {
      setShowButtons(true);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      updateValueAndMentions(inputValue);
    }
  }, []);

  const handleValueChange = event => {
    const val = event.target.value;
    updateValueAndMentions(val);
    if (onValueChange) onValueChange(val);
    adjustInputHeight('mentionInput', false, '100px');
  };

  const handleCancelClick = () => {
    setShowButtons(false);
    onValueChange('');
    if (onCancelClick) onCancelClick();
    adjustInputHeight('mentionInput', true);
  };

  const successCallback = () => {
    setShowButtons(false);
    onValueChange('');
  };

  const handleConfirmClick = textValue => {
    if (textValue.toString().trim().length === 0) {
      onValueChange('');
      return;
    }
    onConfirmClick(textValue, successCallback);
  };

  const shouldConfirmButtonBeDisabled = () => {
    if (props.isEditEnabled) {
      return (
        (inputValue.trim() === props.initialValue ||
          inputValue.trim().length === 0) &&
        !(
          additionalConditionToEnableConfirmButton &&
          additionalConditionToEnableConfirmButton()
        )
      );
    }
    return (
      (!inputValue || inputValue.trim().length === 0) &&
      !(
        additionalConditionToEnableConfirmButton &&
        additionalConditionToEnableConfirmButton()
      )
    );
  };

  useEffect(() => {
    if (props.onHeightChange) props.onHeightChange();
  }, [mentionParentRef.current && mentionParentRef.current.clientHeight]);

  return (
    <StyledMentionsInputField
      isEditEnabled={props.isEditEnabled}
      ref={mentionContainerRef || null}
    >
      <div className="textBoxContainer" ref={mentionParentRef}>
        {functionForViewAboveTextBox && functionForViewAboveTextBox()}
        <div className="mentionInputContainer">
          <MentionsInput
            className="commentTextArea"
            id="mentionInput"
            inputRef={inputReference}
            onChange={event => handleValueChange(event)}
            placeholder={inputPlaceholder}
            value={inputValue}
          >
            <Mention
              appendSpaceOnAdd
              data={(search, callback) => {
                const filteredUser = filterListByEitherOfTwoParams(
                  allUsers,
                  'display',
                  'email',
                  search
                );
                callback(filteredUser);
              }}
              displayTransform={(id, display) => `@${display}`}
              markup="//~[__display__](__id__)~//"
              renderSuggestion={(suggestion, search, highlightedDisplay) => (
                <div className="mentions_list_item_container">
                  <Avatar
                    name={suggestion.name}
                    size="M"
                    src={suggestion.image}
                  />
                  <div className="mentions_list_item">
                    {highlightedDisplay}
                    <div className="mentions_list_item_email">
                      {suggestion.email}
                    </div>
                  </div>
                </div>
              )}
              trigger="@"
            />
          </MentionsInput>
          {functionToAddViewInsideTextBoxBottom && functionToAddViewInsideTextBoxBottom()}
        </div>

        {(showButtons || isButtonAlwaysVisible) && (
          <div>
            {functionForViewAboveButton && functionForViewAboveButton()}
            <div className="actionButtonContainer">
              <div className="Cancel">
                <SimpleButton color="basic" onClick={() => handleCancelClick()}>
                  Cancel
                </SimpleButton>
              </div>
              <div className="confirm">
                <SimpleButton
                  color="primary"
                  disabled={shouldConfirmButtonBeDisabled()}
                  onClick={() => handleConfirmClick(inputValue)}
                >
                  {props.confirmButtonText ? props.confirmButtonText : 'Save'}
                </SimpleButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledMentionsInputField>
  );
};

MentionsInputField.defaultProps = {
  functionToAddViewInsideTextBoxBottom: () => {},
  functionForViewAboveTextBox: () => {},
  functionForViewAboveButton: () => {},
  onMentionedUsersChange: () => {},
  initialValue: 'string',
  onValueChange: () => {},
  // mentionContainerRef: { current: '12' },
  // inputReference: { current: '12' },
  confirmButtonText: 'consfirm',
  onHeightChange: () => {},
  isEditEnabled: false,
  onConfirmClick: () => {},
  onCancelClick: () => {},
  inputPlaceholder: 'Enter a value',
  isButtonAlwaysVisible: false,
  additionalConditionToEnableConfirmButton: null
};

MentionsInputField.propTypes = {
  /**
   *function returns a view which will be rendered at the bottom inside of the textbox
   */
  functionToAddViewInsideTextBoxBottom: Proptypes.func,
  /**
   *function returns a view which will be rendered on the outside of the textbox
   */
  functionForViewAboveTextBox: Proptypes.func,
  /**
   *function returns a view which will be rendered just above the buttons
   */
  functionForViewAboveButton: Proptypes.func,
  /**
   *function to execute when the mentions users changes
   */
  onMentionedUsersChange: Proptypes.func,
  /**
   * initial text value of the textbox
   */
  initialValue: Proptypes.string,
  /**
   *function to execute when the value changes
   */
  onValueChange: Proptypes.func,
  /**
   * container ref for the mentions input
   */
  mentionContainerRef: Proptypes.shape({
    current: Proptypes.any
  }).isRequired,
  /**
   * ref for the mentions input
   */
  inputReference: Proptypes.shape({
    current: Proptypes.any
  }).isRequired,

  /**
   * all users array
   */
  allUsers: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      display: Proptypes.string.isRequired,
      email: Proptypes.string.isRequired,
      image: Proptypes.string
    })
  ).isRequired,
  /**
   * function to execute on cancel click
   */
  onCancelClick: Proptypes.func,
  /**
   * function to execute on cancel click
   */
  onConfirmClick: Proptypes.func,
  /**
   * Is the view in Edit mode and has an initial value
   */
  isEditEnabled: Proptypes.bool,
  /**
   * function to execute on text box height change
   */
  onHeightChange: Proptypes.func,
  /**
   * confirm button alternate text
   */
  confirmButtonText: Proptypes.string,
  /**
   * confirm button alternate text
   */
  inputPlaceholder: Proptypes.string,
  /**
   * should button be visible always
   */
  isButtonAlwaysVisible: Proptypes.bool,
  /**
   * new value for component
   */
  value: Proptypes.string.isRequired,
  /**
   * any additional condition that needs to be checked to enable submit button (OR condition)
   */
  additionalConditionToEnableConfirmButton: Proptypes.func
};

export default MentionsInputField;
