import React, { cloneElement, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import BreadcrumbItem from './BreadcrumbItem';

const cleanChildren = children => {
  return Children.toArray(children).filter(child => isValidElement(child));
};

const Breadcrumb = ({
  children,
  numberOfVisibleBreadcrumbs,
  separator,
  ...rest
}) => {
  const validChildren = cleanChildren(children);
  const collapser = ' ...';

  // eslint-disable-next-line no-unused-expressions
  numberOfVisibleBreadcrumbs > 0 &&
    numberOfVisibleBreadcrumbs < validChildren.length &&
    validChildren.splice(
      1,
      validChildren.length - numberOfVisibleBreadcrumbs - 1,
      collapser
    );

  const clones = validChildren.map((child, index) => {
    if (child === collapser)
      return (
        // eslint-disable-next-line react/jsx-fragments
        <React.Fragment key={`bc_${child.key}`}>
          <Box as="span" mx={2} role="presentation">
            {separator} {collapser}
          </Box>
        </React.Fragment>
      );
    return cloneElement(child, {
      separator,
      numberOfVisibleBreadcrumbs,
      index,
      isCurrentPage:
        validChildren.length > 1 && validChildren.length === index + 1
    });
  });

  return (
    <Box aria-label="breadcrumb" as="nav" {...rest}>
      <Box as="ol" pl="0">
        {clones}
      </Box>
    </Box>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Number of visible breadcrumbs
   */
  numberOfVisibleBreadcrumbs: PropTypes.number,
  /**
   * The visual separator between each breadcrumb item
   */
  separator: PropTypes.string
};

Breadcrumb.defaultProps = {
  numberOfVisibleBreadcrumbs: 0,
  separator: '/'
};
export default Breadcrumb;
export { BreadcrumbItem };
