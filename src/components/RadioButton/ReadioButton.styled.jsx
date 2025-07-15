import styled from 'styled-components';

const StyledRadioButton = styled.div`
  label {
    cursor: pointer;
  }

  label > input[type='radio'] {
    display: none;
  }

  label > input[type='radio'] + *::before {
    content: '';
    display: inline-block;
    vertical-align: bottom;
    width: ${props => (props.size ? props.size : '16px')};
    height: ${props => (props.size ? props.size : '16px')};
    margin-right: 6px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: gray;
  }

  label > input[type='radio']:checked + *::before {
    background: radial-gradient(
      ${props => (props.btnColor ? props.btnColor : '#2f53d7')} 0%,
      ${props => (props.btnColor ? props.btnColor : '#2f53d7')} 40%,
      transparent 50%,
      transparent
    );
    border-color: ${props => (props.btnColor ? props.btnColor : '#2f53d7')};
  }

  label > div {
    display: flex;
    align-items: center;
    color: ${props => (props.textColor ? props.textColor : '#000')};
  }
`;

export default StyledRadioButton;
