import Styled from 'styled-components';
import Box from '../Box';
import { colors } from '../theming/modules/colors';

const StyledUserChipInput = Styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    border-radius: 4px;

    .inputIcon {
        position: absolute;
        right: 20px;
    }

    .chipView {
        position: relative;
        display: flex;
        align-items: center;
        flex-flow: wrap;
        width: 100%;
        min-height: 44px;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        padding-top: 6px;
        outline: none;
        background: none;
        box-sizing: border-box;
        border: ${props => (props.noBorder ? 0 : '1px solid')};
        border-color: #C8C9D1;
        background-color: ${props => props.backgroundColor || '#ffffff'};
        color: #202124;
        padding-left: 16px;
        padding-right: 12px;
        padding-bottom: 6px;
        border-radius:4px;
        transition: 0.2s border;

        &.active {
            border: ${props =>
    props.noBorder ? 0 : `1px solid ${colors.blue[50]}`};
        }
    }

    .searchInput {
        border: 0 !important;
        outline: none !important;
        flex: 1;
        background-color: ${props => props.backgroundColor || '#ffffff'};
    }

    .searchInput::placeholder {
      color: #adadae;
    }

    .renderListContainer {
        border: 1px solid #E1E1E8;
        border-radius: 4px;
        position: absolute;
        min-width: 400px;
        z-index: ${props => props.zIndex || 9};
        top: ${props => `${props.containerHeight}px`};
        max-height: 300px;
        overflow-y: auto;
    }

    .renderListItem {
        &:hover {
            background: #eaf3fd
        }
    }
`;

export default StyledUserChipInput;
