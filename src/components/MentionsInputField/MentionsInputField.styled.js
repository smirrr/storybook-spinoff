import styled from 'styled-components';

const StyledMentionsInputField = styled.div.attrs({
  className: 'mentionTaskAssignmentInput'
})`
  ${props =>
    props.isBottomAligned
      ? `
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
        `
      : ''};
  .textBoxContainer {
    display: flex;
    padding: 16px 24px;
    ${props =>
    props.isEditEnabled
      ? ''
      : 'box-shadow: 0 2px 8px 0 rgba(134, 139, 143, 0.3)'};
    flex-direction: column;
    flex-shrink: 0;
    ${props => props.isMobile && 'background-color: #fff'}
  }

  .mentionInputContainer {
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0);
    border-radius: 4px;
    border: solid 1px #c8c9d1;

    &:hover {
      border-color: #adaeb5;
      box-shadow: 0 1px 3px 0 rgba(9, 30, 66, 0.25),
        0 0 1px 0 rgba(9, 30, 66, 0);
    }

    :focus-within {
      border-color: #2f53d7;
      box-shadow: 0 1px 3px 0 rgba(47, 83, 215, 0.25),
        0 0 1px 0 rgba(47, 83, 215, 0);
    }

    .commentTextArea__input {
      ${props =>
    props.mentionInputFontSize
      ? `font-size: ${props.mentionInputFontSize}px`
      : 'font-size: 14px'};
    }
  }
  .taskAssignmentOption {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 18px;
    img {
      cursor: pointer;
    }
    .userSelectionDropdown {
      cursor: pointer;
      padding-left: 4px;
    }
  }

  .helpText {
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.43;
  }

  .actionButtonContainer {
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    float: right;

    .confirm {
      margin-left: 8px;
    }
  }

  .userDetail {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .userSelectionContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #c8c9d1;
    height: 24px;
    padding: 4px;
    border-radius: 2px;
  }

  .userSuggestions {
    ${props =>
    !props.isMobile
      ? `
          min-width: 232px;
          width: max-content;
          z-index: 9;
          position: absolute;
          border-radius: 2px;
          width: max-content;
          background-color: #fff;
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1),
            0 32px 32px 0 rgba(134, 139, 143, 0.2);
          `
      : ''};

    .dropdownHeader {
      padding: 10px 24px;
      font-size: 12px;
      font-weight: 500;
      color: #a2a5b1;
    }

    .singleUser {
      display: flex;
      flex-direction: row;
      align-items: center;
      ${props => (!props.isMobile ? 'padding:8px 24px;' : 'padding: 8px 0;')};
      cursor: pointer;
      .singleUserImage {
        margin-right: 8px;
      }

      &:hover {
        ${props => (!props.isMobile ? 'background-color: #eaebf0;' : '')};
      }
    }
  }

  .mentions_list_item_container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .replySection {
    position: relative;
  }

  .closeIcon {
    position: absolute;
    right: 0;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  .commentTextArea__highlighter {
    display: none !important;
  }
  .commentTextArea__input {
    display: flex !important;
    position: relative !important;
    box-sizing: border-box !important;
    width: 100% !important;
    ${props =>
    !props.isMobile ? 'padding: 16px !important' : 'padding: 14px 16px;'};
    resize: none !important;
    ${props => (!props.isMobile ? 'min-height: 100px !important' : '')};
    max-height: 140px !important;
    border-radius: 4px !important;
    // border: solid 1px #a2a5b1;
    border: none;
    background-color: #fff !important;
    // box-shadow: 0 1px 2px 0 rgba(9, 30, 66, 0.15), 0 0 1px 0 rgba(9, 30, 66, 0);
    transition: border-color 0.2s ease-in;
    overflow-y: auto !important;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .commentTextArea__suggestions__list {
    max-height: 320px !important;
    overflow: auto !important;
    padding: 12px 0px !important;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  }
  .commentTextArea__suggestions {
    margin-bottom: 100px !important;
    width: 100% !important;
    bottom: 0px !important;
    top: unset !important;
    ${props => (props.isMobile ? 'max-width: 100%;' : '')}
  }
  .commentTextArea__suggestions__item {
    display: flex;
    align-items: center;
    padding: 0px 12px !important;
    height: 12px !important;
  }
  .commentTextArea__suggestions__item--focused {
    background-color: #e5f1ff;
  }
`;

export default StyledMentionsInputField;
