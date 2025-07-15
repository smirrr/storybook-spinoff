import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Link from '../Link';

const BreadcrumbItem = ({
  index,
  isCurrentPage,
  separator,
  children,
  ...rest
}) => {
  return (
    <Box alignItems="center" as="li" display="inline-flex" {...rest}>
      {index > 0 && (
        <Box as="span" mx={2} role="presentation">
          {separator}
        </Box>
      )}
      <Link
        aria-current={isCurrentPage ? 'page' : null}
        color={isCurrentPage ? 'basic.10' : 'link'}
        fontSize="14px"
        isDisabled={isCurrentPage}
        {...rest}
      >
        {children}
      </Link>
    </Box>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  /**
   * index of the breadcrumb item
   */
  index: PropTypes.number,
  /**
   * If `true`, indicates that the breadcrumb item is active and will not be clickable
   */
  isCurrentPage: PropTypes.bool,
  /**
   * The visual separator between each breadcrumb item
   */
  separator: PropTypes.string
};

BreadcrumbItem.defaultProps = {
  separator: '/',
  index: 0,
  isCurrentPage: false
};

export default BreadcrumbItem;
