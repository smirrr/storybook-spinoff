import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Text from '../Text';
import ContentSelectionItem from './ContentSelectionItem';

const shadow =
  '0 1px 3px 0 rgba(0, 0, 0, 0.2), 1px 3px 4px 0 rgba(241, 241, 241, 0.15), 0 4px 8px 0 rgba(0, 0, 0, 0.05)';

const ContentSelection = ({ title, description, help, children }) => {
  return (
    <Box bg="white" borderRadius="4px" boxShadow={shadow} p="24px 16px 12px">
      <Box
        alignItems="flex-end"
        d="flex"
        justifyContent="space-between"
        mb="6px"
      >
        <Box>
          <Text color="black" type="button">
            {title}
          </Text>
        </Box>
        {help && (
          <Box alignItems="flex-end" d="flex" h="16px">
            {help}
          </Box>
        )}
      </Box>
      {description && (
        <Text color="grey.30" mb="22px" type="note">
          {description}
        </Text>
      )}
      <Box d="flex" flexDir="column" my="10px">
        {children}
      </Box>
    </Box>
  );
};

ContentSelection.propTypes = {
  /**
   * List of content selection items
   */
  children: PropTypes.node.isRequired,
  /**
   * Short description of the block
   */
  description: PropTypes.string,
  /**
   * Helper element. It can be a tag, tooltip, badge, etc.
   */
  help: PropTypes.node,
  /**
   * Title
   */
  title: PropTypes.string.isRequired
};

ContentSelection.defaultProps = {
  description: '',
  help: null
};

ContentSelection.displayName = 'ContentSelection';

export default ContentSelection;
export { ContentSelectionItem };
