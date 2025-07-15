import styled from 'styled-components';

export default styled.div`
  position: ${props => props.selectorPosition};
  ${props => (props.selectorTop ? `top: ${props.selectorTop}px` : '')};
  ${props => (props.selectorRight ? `right: ${props.selectorRight}px` : '')};
  ${props => (props.selectorBottom ? `bottom: ${props.selectorBottom}px` : '')};
  ${props => (props.selectorLeft ? `left: ${props.selectorLeft}px` : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.selectorBackground};
  border-radius: 4px;
  cursor: pointer;
  height: ${props => props.selectorPadding + props.selectorHeight}px;
  width: ${props => props.selectorPadding + props.selectorWidth}px;
  .emojiIcon {
    height: ${props => props.selectorHeight}px;
    width: ${props => props.selectorWidth}px;
  }
  &:hover {
    background-color: ${props => props.selectorHoverBackground}
   
`;

export const Palette = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed;
  ${props => (props.top ? `top: ${props.top}px;` : '')};
  ${props => (props.right ? `right: ${props.right}px;` : '')};
  height: 40px;
  padding: ${props => (props.renderSmallerVersion ? '4px 8px' : '8px')};
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15),
    2px 24px 24px 0 rgba(134, 139, 143, 0.2);
  background-color: #fff;
  & > div:not(:first-child) {
    margin-left: 8px;
  }
`;

export const Emoji = styled.div.attrs({ className: 'no-user-select' })`
  height: ${props => (props.renderSmallerVersion ? '30px' : '40px')};
  width: ${props => (props.renderSmallerVersion ? '30px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  & > span {
    font-size: ${props => (props.renderSmallerVersion ? '20px' : '24px')};
    line-height: 20px;
    color: #54555d;
  }
  &:hover {
    background-color: #e5f1ff;
  }
`;
