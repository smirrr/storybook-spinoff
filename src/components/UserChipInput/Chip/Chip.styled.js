import Styled from 'styled-components';
import { colors } from '../../theming/modules/colors';
import Box from '../../Box';

const ChipStyleContainer = Styled(Box)`
  display: flex;
  align-items: center;
  background-color: ${props => (props.bgColor ? props.bgColor : '#E8EDFF')};
  border-radius: 4px;
  padding: 0px 10px 0px 8px;
  margin: 2px 4px 2px 0px;
  max-width: calc(100% -16px);
  height: 26px;

  .chipAvatar {
    margin-right: 4px;
    height: 18px;
    width: 18px;
    border: 1px solid #fff;
 
    > div > div {
      font-size: 10px;
      text-align: center;
    }
  }

  .chipLabel {
    flex: 1;
    color: ${props => (props.color ? props.color : colors.black)};
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-transform: capitalize;
  }

  .chipDelete {
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin-left: 4px;
  }
`;

export default ChipStyleContainer;
