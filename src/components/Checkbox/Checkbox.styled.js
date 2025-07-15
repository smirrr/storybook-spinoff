import styled from 'styled-components';

const StyledCheckbox = styled.div`
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    height: 0;
    width: 0;
  }

  label {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* Create a custom checkbox */
  label .checkmark {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    height: 14px;
    width: 14px;
    background-color: #fff;
    border: 1px solid #6c6d6f;
    border-radius: 2px;
    transition: background-color 0.2s;
  }

  /* When the checkbox is disabled with box being checked */
  label .checkmark.disabled {
    border: 1px solid #000;
    background-color: #ddd;
    opacity: 0.5;
  }

  /* When the checkbox is checked or indeterminate, add a blue background */
  label .checkmark.checked,
  label .checkmark.indeterminate {
    background-color: #2f53d7;
    border: 1px solid #2f53d7;
    transition: background-color 0.2s;
    &.disabled {
      opacity: 0.5;
    }
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    visibility: hidden;
    opacity: 0;
    transition: 0.2s linear;
  }

  /* Show the checkmark when checked or inderminate*/
  label .checkmark.checked:after,
  label .checkmark.indeterminate:after {
    visibility: visible;
    opacity: 1;
    transition: 0.1s linear;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 4px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* Style the indeterminate checkmark/indicator */
  .checkmark.indeterminate:after {
    left: 6px;
    top: 2px;
    width: 0px;
    height: 10px;
    border-width: 0 2px 0px 0;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
`;

export default StyledCheckbox;
