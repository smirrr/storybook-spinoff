import styled from 'styled-components';

const StyledItemSelectorDropDown = styled.div`
  position: relative;

  .dropDownSelector {
    width: ${props => props.width};
    box-shadow: ${props => props.theme.shadows.base};
    background-color: ${props => props.theme.colors.background.light};
    border-radius: ${props => props.theme.borders.size4};
    padding: ${props => props.theme.space[4]}px
      ${props => props.theme.space[8]}px;
    font-size: ${props => props.theme.lineHeights[2]};
    align-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    span {
      line-height: ${props => props.theme.space[13]}px;
    }

    .textContainer {
      display: flex;
      flex-direction: column;
    }

    #tooltipAria {
      position: absolute;
      z-index: 10;
    }
  }

  .dropDownSelector:hover {
    box-shadow: ${props => props.theme.shadows.active};
  }

  .dropDownBodyContainer {
    position: absolute;
    padding: ${props => props.theme.space[12]}px
      ${props => props.theme.space[8]}px;
    margin-top: ${props => props.theme.space[7]}px;
    box-shadow: ${props => props.theme.shadows.base};
    border-radius: ${props => props.theme.borders.size4};
    background-color: ${props => props.theme.colors.background.light};
    width: ${props => props.width};

    .dropdownTitle {
      color: ${props => props.theme.colors.basic['30']};
      margin-bottom: ${props => props.theme.space[4]}px;
      font-weight: bold;
      font-size: ${props => props.theme.space[7]}px;
      line-height: ${props => props.theme.space[10]}px;
    }
    .drop-down-search {
      input {
        color: ${props => props.theme.colors.basic['30']};
        padding: 15px 30px 15px 40px;
      }
      button {
        padding: 10px;
      }
    }

    .optionsContainer {
      box-shadow: ${props => props.theme.shadows.hoverAlt};
      border-radius: ${props => props.theme.borders.size4};
      max-height: ${props => props.maxHeight};
      overflow: scroll;

      .selectedItem {
        background-color: ${props => props.theme.colors.blue['90']};
      }

      &.empty {
        padding: ${props => props.theme.space[12]}px;
        justify-content: center;
        display: flex;
      }

      .emptyPlaceholder {
        font-size: ${props => props.theme.space[7]}px;
      }
    }

    .drop-down-search {
      button {
        cursor: default;
      }
    }
  }

  [role='tooltip'] {
    display: none;
  }

  span:hover + [role='tooltip'],
  span:focus + [role='tooltip'] {
    display: block;
  }
`;

export default StyledItemSelectorDropDown;
