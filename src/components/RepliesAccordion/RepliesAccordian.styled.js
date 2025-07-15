import styled from 'styled-components';

const StyledRepliesAccordion = styled.div.attrs({
  className: 'parentContainer'
})`
  height: auto;
  .repliesParentContainer {
    animation-duration: 1s;
    animation-name: slidein;
    border-left: 4px solid #f9b312;
    padding-left: 8px;
    border-radius: 2px;
  }
  .openCloseText {
    font-size: 14px;
    color: #2f53d7;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    margin-top: 8px;
  }
  .chevronIcon {
    padding-left: 4px;
  }
  @keyframes slidein {
    from {
      max-height: 0px;
      transform: translateY(0);
      opacity: 0;
    }

    to {
      max-height: 1000px;
      transform: translateY(1);
      opacity: 1;
    }
  }
`;

export default StyledRepliesAccordion;
