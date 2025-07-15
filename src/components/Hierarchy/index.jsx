import React, {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import HierarchyItem from './HierarchyItem';

const Hierarchy = ({
  allNodes,
  children,
  depth,
  depthLimit,
  loadChildrenWithDelay,
  nodeRefId,
  smallDash,
  toggleNodeExpand,
  variant,
  ...rest
}) => {
  const [nodeMap, setNodeMap] = useState(allNodes);
  const _handleToggleNodeExpand = u => {
    const parentNode = u.parent;
    const siblings = [...allNodes[parentNode]];
    const index = siblings.findIndex(user => user.refId === u.refId);
    const selfNode = siblings[index];
    if (loadChildrenWithDelay) {
      if (!selfNode.isExpanded) {
        selfNode.isLoading = true;
        toggleNodeExpand(u, index);
      } else {
        selfNode.isExpanded = false;
        selfNode.isLoading = false;
      }
    } else {
      selfNode.isExpanded = !selfNode.isExpanded;
    }
    setNodeMap(prev => ({
      ...prev,
      [parentNode]: siblings
    }));
  };

  const hasChildren = item => {
    return (
      !item.isEndNode &&
      allNodes &&
      allNodes[item.refId] &&
      allNodes[item.refId].length > 0 &&
      item.isExpanded
    );
  };

  const siblingsCount = nodeMap[nodeRefId] ? nodeMap[nodeRefId].length : 0;

  const childrenWithProps = item => {
    return Children.map(children, child => {
      const props = { depth, ...item };
      if (isValidElement(child)) {
        return cloneElement(child, props);
      }
      return child;
    });
  };

  useEffect(() => {
    setNodeMap(allNodes);
  }, [allNodes]);

  return (
    <Box {...rest}>
      <Box
        as="ul"
        left={variant === 'default' ? '-9px' : 0}
        listStyle="none"
        m={depth > 0 && variant === 'default' ? '16px 0 0' : '0'}
        pl={0}
        position="relative"
      >
        {nodeMap[nodeRefId] &&
          nodeMap[nodeRefId].map((item, index) => (
            <HierarchyItem
              depth={depth}
              depthLimit={depthLimit}
              index={index}
              item={item}
              key={item.refId}
              siblingsCount={siblingsCount}
              smallDash={smallDash}
              toggleExpand={_handleToggleNodeExpand}
              variant={variant}
              {...rest}
            >
              {childrenWithProps(item)}
              {hasChildren(item) && (
                <Hierarchy
                  allNodes={nodeMap}
                  depth={depth + 1}
                  depthLimit={depthLimit}
                  loadChildrenWithDelay={loadChildrenWithDelay}
                  nodeRefId={item.refId}
                  smallDash={smallDash}
                  toggleNodeExpand={_handleToggleNodeExpand}
                  variant={variant}
                  {...rest}
                >
                  {childrenWithProps(item)}
                </Hierarchy>
              )}
            </HierarchyItem>
          ))}
      </Box>
    </Box>
  );
};

Hierarchy.propTypes = {
  /**
   * Entire hierarchy object
   */
  allNodes: PropTypes.objectOf(PropTypes.array).isRequired,
  /**
   * UI element used for each element in the hierarchy
   */
  children: PropTypes.node.isRequired,
  /**
   * Depth of the hierarchy tree at a particular level
   */
  depth: PropTypes.number.isRequired,
  /**
   * Depth limit for opening the hierarchy tree
   */
  depthLimit: PropTypes.number,
  /**
   * Are children loaded with some delay?
   */
  loadChildrenWithDelay: PropTypes.bool,
  /**
   * Node ref id in the hierarchy object
   */
  nodeRefId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /**
   * Small dash in front of users
   */
  smallDash: PropTypes.bool,
  /**
   * Handler to toggle expansion of node
   */
  toggleNodeExpand: PropTypes.func,
  /**
   * Style for the hierarchy tree expansion
   */
  variant: PropTypes.string
};

Hierarchy.defaultProps = {
  depthLimit: -1,
  loadChildrenWithDelay: false,
  smallDash: false,
  toggleNodeExpand: null,
  variant: 'default'
};

Hierarchy.displayName = 'Hierarchy';
export default Hierarchy;
