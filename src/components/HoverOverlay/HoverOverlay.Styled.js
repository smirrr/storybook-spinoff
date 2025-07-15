import styled from 'styled-components';
import Box from '../Box';

export const AIHoverComponentModal = styled(Box)`
  position: fixed;
  z-index: 99999;
  background-color: ${(props) => props.modalBackgroundColor};
  border: 1px solid #e7e8ed;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-height: calc(100vh - 20px);
`;

export const AIHoverComponentWrapper = styled(Box)`
  display: inline-block;
  position: relative;
  .keywordText {
    white-space: normal;
    word-wrap: break-word;
    background: ${(props) => props.highlightColor};
  }
`;

export const TriangleComponent = styled(Box)`
  position: absolute;
  width: 0;
  height: 0;
  ${(props) => {
    if (props.direction === 'up') {
      return `
        top: ${props.topPosition}px;
        left: ${props.arrowLeftPosition}px;
        border-bottom: 15px solid ${props.modalBackgroundColor};
        border-left: 8.5px solid transparent;
        border-right: 8.5px solid transparent;
        border-top: 0;
      `;
    }
    if (props.direction === 'left') {
      return `
        left: -15px;
        top: ${props.topPosition}px;
        transform: translateY(-50%);
        border-right: 15px solid ${props.modalBackgroundColor};
        border-top: 8.5px solid transparent;
        border-bottom: 8.5px solid transparent;
        border-left: 0;
      `;
    }

    // default to direction = 'right'
    return `
        right: -15px;
        top: ${props.topPosition}px;
        transform: translateY(-50%);
        border-left: 15px solid ${props.modalBackgroundColor};
        border-top: 8.5px solid transparent;
        border-bottom: 8.5px solid transparent;
        border-right: 0;
      `;
  }}
`;
