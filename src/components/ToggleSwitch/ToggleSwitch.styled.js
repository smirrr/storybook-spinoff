import styled from 'styled-components';

const StyledToggleSwitch = styled.div`
  &.switch {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 14px;
  }

  &.switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 8px;
    width: 8px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2f53d7;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2f53d7;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(8px);
    -ms-transform: translateX(8px);
    transform: translateX(8px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  input[type='checkbox' i]:focus {
    outline: none;
  }
`;

export default StyledToggleSwitch;
