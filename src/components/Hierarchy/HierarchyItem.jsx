/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Icon from '../Icon';
import { add, subtract, chevronDown, chevronUp } from '../IconLib';
import Spinner from '../Spinner';

const HierarchyItem = ({
  item: { refId, parent, isEndNode, isLoading, isExpanded },
  children,
  depth,
  depthLimit,
  index,
  siblingsCount,
  smallDash,
  toggleExpand,
  variant,
  ...rest
}) => {
  const accordionTypes = ['accordion', 'customAccordion'];
  const isDisabledNode = accordionTypes.includes(variant)
    ? depthLimit === depth && !isEndNode
    : isEndNode && parent === '_root';
  const onExpand = () => {
    if (!isDisabledNode) {
      toggleExpand({ refId, parent, isEndNode });
    }
  };
  const dashWidth = smallDash ? '14px' : '40px';
  return (
    <Box as="li" d="block" listStyle="none" position="relative" {...rest}>
      <Box
        cursor="pointer"
        d="flex"
        m={accordionTypes.includes(variant) ? '0' : '10px 0 5px'}
        position={accordionTypes.includes(variant) ? 'relative' : ''}
      >
        {variant === 'default' &&
          depth > 0 &&
          (index === 0 || index < siblingsCount - 1) && (
          <Box
            as="span"
            bg="grey.70"
            h={
              index === 0
                ? `calc(100% + ${siblingsCount > 1 ? 35 : 5}px)`
                : 'calc(100% + 10px)'
            }
            left="0"
            position="absolute"
            top={index === 0 ? '-16px' : '10px'}
            w="1px"
            zIndex="3"
          />
        )}
        {variant === 'default' && (
          <Box
            as="span"
            bg={parent === '_root' ? 'transparent' : 'grey.70'}
            h="1px"
            position="relative"
            top="9px"
            w={isDisabledNode ? '20px' : isEndNode ? dashWidth : '20px'}
          />
        )}
        {variant === 'default' && (
          <Box
            alignItems="center"
            bg={
              isDisabledNode
                ? 'grey.80'
                : !isEndNode
                  ? 'blue.90'
                  : 'transparent'
            }
            d="flex"
            h="20px"
            justifyContent="center"
            onClick={onExpand}
            position="relative"
            w={isDisabledNode ? '20px' : isEndNode ? '0px' : '20px'}
          >
            {!isEndNode && isLoading && (
              <Spinner color="grey.20" size="12px" thickness="1px" />
            )}
            {(isDisabledNode || (!isEndNode && !isLoading)) && (
              <Icon
                color="grey.20"
                icon={!isExpanded ? add : subtract}
                size="20px"
              />
            )}
          </Box>
        )}
        <Box
          flex="1"
          onClick={e => {
            if (accordionTypes.includes(variant)) {
              onExpand();
              e.stopPropagation();
            }
          }}
          {...rest}
        >
          {children}
        </Box>
        {variant === 'accordion' && (
          <Box
            alignItems="center"
            bg={isDisabledNode ? 'grey.90' : 'transparent'}
            d="flex"
            h="20px"
            justifyContent="center"
            mt={1}
            pointerEvents="none"
            position="absolute"
            right="6px"
            top="10px"
            w="20px"
          >
            {!isEndNode && isLoading && (
              <Spinner color="grey.20" size="12px" thickness="1px" />
            )}
            {(isDisabledNode || (!isEndNode && !isLoading)) && (
              <Icon
                color={isDisabledNode ? 'grey.20' : 'blue.50'}
                icon={!isExpanded ? chevronDown : chevronUp}
                size="20px"
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

HierarchyItem.propTypes = {
  children: PropTypes.node.isRequired,
  depth: PropTypes.number.isRequired,
  depthLimit: PropTypes.number,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    isEndNode: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    parent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    refId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  siblingsCount: PropTypes.number.isRequired,
  smallDash: PropTypes.bool,
  toggleExpand: PropTypes.func.isRequired,
  variant: PropTypes.string
};

HierarchyItem.defaultProps = {
  depthLimit: -1,
  smallDash: false,
  variant: 'default'
};

HierarchyItem.displayName = 'HierarchyItem';
export default HierarchyItem;
