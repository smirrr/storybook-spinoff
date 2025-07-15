import React, { useState, useEffect } from 'react'; // Import useEffect
import Hierarchy from './index';
import Box from '../Box'; // Assuming Box component is available
import PseudoBox from '../PseudoBox'; // Assuming PseudoBox component is available
import UsersMap from './utils'; // Assuming UsersMap is a utility that provides your user data structure
import Proptypes from 'prop-types';

export default {
  title: 'Molecules/Hierarchy',
  component: Hierarchy,
  tags: ['autodocs', 'molecule'], // Enable autodocs and categorize

  // Define argTypes for interactive controls and documentation
  argTypes: {
    allNodes: {
      control: 'object',
      description: 'The map of all hierarchical nodes/users.',
    },
    nodeRefId: {
      control: 'text',
      description: 'The ID of the root node from which to start the hierarchy display.',
    },
    depth: {
      control: 'number',
      description: 'The initial depth of the hierarchy (usually 0 for the root).',
    },
    variant: {
      control: 'select',
      options: ['default', 'accordion'],
      description: 'The visual variant of the hierarchy display (e.g., "default", "accordion").',
    },
    loadChildrenWithDelay: {
      control: 'boolean',
      description: 'If true, child nodes will load with a simulated delay.',
    },
    smallDash: {
      control: 'boolean',
      description: 'If true, renders a smaller dash for connections.',
    },
    toggleNodeExpand: {
      action: 'node expanded/collapsed',
      description: 'Callback function triggered when a node is expanded or collapsed.',
    },
    // `children` prop for render functions (UserLabel/UserLabelForAccordion)
    // is usually not controlled directly via argTypes
    children: {
      control: false,
    },
  },
  // Set common default args for all stories
  args: {
    allNodes: JSON.parse(JSON.stringify(UsersMap)), // Ensure deep copy for mutable data
    nodeRefId: '_root',
    depth: 0,
    variant: 'default',
    loadChildrenWithDelay: false,
    smallDash: false,
    toggleNodeExpand: (user, index) => console.log('Node toggle:', user, index),
  },
};

// --- Reusable UserLabel Components ---

// eslint-disable-next-line react/prop-types
const UserLabel = ({ userName, parent, label, count }) => (
  <>
    <Box
      as="span"
      color="#6c6d6f"
      fontSize="12px"
      fontWeight="500"
      letterSpacing="0.24px"
      lineHeight="20px"
      m="0 5px 0 10px"
    >
      {userName}
    </Box>
    {parent !== '_root' && label && (
      <Box
        as="span"
        bg="#eaebf0"
        borderRadius="2px"
        color="#54555d"
        fontSize="12px"
        fontWeight="500"
        h="20px"
        letterSpacing="0.24px"
        lineHeight="20px"
        m="0 5px"
        p="0 6px"
      >
        {label}
      </Box>
    )}
    {parent !== '_root' && !label && (
      <Box
        as="span"
        bg="#fff"
        border="solid 1px #2f53d7"
        borderRadius="2px"
        color="#2f53d7"
        fontSize="12px"
        fontWeight="500"
        h="18px"
        letterSpacing="0.24px"
        lineHeight="18px"
        m="0 5px"
        p="0 6px"
      >
        Assign function
      </Box>
    )}
    <Box
      as="span"
      bg="#f8f8fa"
      borderRadius="2px"
      color="#54555d"
      fontSize="12px"
      fontWeight="500"
      h="20px"
      letterSpacing="0.2px"
      lineHeight="20px"
      ml="5px"
      p="0 6px"
    >
      {count}
    </Box>
  </>
);
UserLabel.propTypes = {
  userName: Proptypes.string.isRequired,
  parent: Proptypes.string,
  label: Proptypes.string,
  count: Proptypes.number.isRequired,
};
UserLabel.defaultProps = {
  parent: '_root',
  label: '',
};

// eslint-disable-next-line react/prop-types
const UserLabelForAccordion = ({ userName, depth, label, count }) => (
  <PseudoBox
    _hover={{ background: '#f8f8fa' }}
    alignItems="center"
    borderBottom="1px solid #eaebf0"
    d="flex"
    pl={`${depth * 28 + 5}px`}
    pr="32px"
    py={5}
  >
    <Box
      as="span"
      bg="grey.80"
      borderRadius="2px"
      color="#54555d"
      fontSize="10px"
      fontWeight="500"
      h="20px"
      letterSpacing="0.2px"
      lineHeight="20px"
      ml="5px"
      p="2px 6px"
    >
      {count}
    </Box>
    <Box
      as="span"
      color="#6c6d6f"
      fontSize="14px"
      fontWeight="500"
      letterSpacing="0.24px"
      lineHeight="20px"
      m="0 5px 0 10px"
    >
      {userName}
    </Box>
    {label && (
      <Box
        as="span"
        color="grey.50"
        fontSize="14px"
        fontWeight="500"
        letterSpacing="0.24px"
        lineHeight="20px"
        m="0 5px"
      >
        - {label}
      </Box>
    )}
  </PseudoBox>
);
UserLabelForAccordion.propTypes = {
  userName: Proptypes.string.isRequired,
  depth: Proptypes.number.isRequired,
  label: Proptypes.string,
  count: Proptypes.number.isRequired,
};
UserLabelForAccordion.defaultProps = {
  label: '',
};

// --- Stories ---

/**
 * The default hierarchy view, showing expandable nodes.
 */
export const Default = {
  render: (args) => {
    // We don't need local state for `users` here if it's not being modified
    // This story will use the `allNodes` from `args` directly.
    return (
      <Hierarchy {...args}>
        <UserLabel />
      </Hierarchy>
    );
  },
  args: {
    // Inherits all default args
    // Explicitly set variant if it's not the default
    variant: 'default',
  },
};

/**
 * Demonstrates hierarchy with a simulated delay when expanding nodes.
 * Click to expand a node and observe the loading state.
 */
export const WithDelay = {
  render: (args) => {
    // For delay, we need local state to manage `isLoading` and `isExpanded`
    const [users, setUsers] = useState(JSON.parse(JSON.stringify(UsersMap)));

    // Reset users map if the Storybook control for allNodes changes
    useEffect(() => {
      setUsers(JSON.parse(JSON.stringify(args.allNodes)));
    }, [args.allNodes]);

    const _handleToggleNodeExpand = (u, i) => {
      const parentNodeId = u.parent;
      // Deep clone to ensure immutability before modification for React state updates
      const updatedUsers = JSON.parse(JSON.stringify(users));
      const siblings = updatedUsers[parentNodeId];

      if (!siblings) {
        console.warn(`No siblings found for parent node ID: ${parentNodeId}`);
        return;
      }

      const node = siblings[i];

      if (node && !node.isExpanded) {
        // Set loading state immediately
        node.isLoading = true;
        setUsers(updatedUsers);

        setTimeout(() => {
          // After delay, update expanded state and remove loading state
          node.isExpanded = !node.isExpanded;
          node.isLoading = false;
          setUsers(JSON.parse(JSON.stringify(updatedUsers))); // Trigger re-render with new state
          args.toggleNodeExpand(u, i); // Call original Storybook action
        }, 1000);
      } else if (node) { // If it's expanded and being collapsed
          node.isExpanded = !node.isExpanded;
          setUsers(updatedUsers);
          args.toggleNodeExpand(u, i); // Call original Storybook action
      }
    };

    return (
      <Hierarchy
        {...args} // Spread all args
        allNodes={users} // Use local state for `allNodes`
        loadChildrenWithDelay
        smallDash
        toggleNodeExpand={_handleToggleNodeExpand} // Use local handler
      >
        <UserLabel />
      </Hierarchy>
    );
  },
  args: {
    // Override defaults for this specific story
    loadChildrenWithDelay: true,
    smallDash: true,
  },
};

/**
 * Displays the hierarchy in an accordion-style layout.
 */
export const WithAccordion = {
  render: (args) => {
    // No local state needed here unless you plan to modify users within this story
    return (
      <Hierarchy {...args}>
        <UserLabelForAccordion /> {/* Use the accordion-specific label */}
      </Hierarchy>
    );
  },
  args: {
    // Override defaults for this specific story
    variant: 'accordion',
  },
};