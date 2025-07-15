import React from 'react';
import Tachometer from './index';
import Text from '../Text/index'; // Assuming Text is a valid component
import Box from '../Box/index';   // Assuming Box is a valid component

export default {
  title: 'Molecules/Tachometer',
  component: Tachometer,
  tags: ['autodocs', 'molecule'], // Add tags for better organization and auto-generated docs

  // Define common argTypes for all stories to enable interactive controls
  argTypes: {
    arcWidth: {
      control: { type: 'number', min: 1, max: 50, step: 1 },
      description: 'The width of the circular arc.',
    },
    customSegmentStops: {
      control: 'array',
      description: 'An array of values defining where color segments change.',
    },
    height: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
      description: 'The height of the tachometer SVG.',
      if: { arg: 'fluidWidth', eq: false }, // Only show if fluidWidth is false
    },
    maxValue: {
      control: 'number',
      description: 'The maximum value of the tachometer scale.',
    },
    minValue: {
      control: 'number',
      description: 'The minimum value of the tachometer scale.',
    },
    segmentColors: {
      control: 'array',
      description: 'An array of colors for each segment.',
    },
    value: {
      control: 'number',
      description: 'The current value to display on the tachometer.',
    },
    width: {
      control: { type: 'number', min: 10, max: 300, step: 5 },
      description: 'The width of the tachometer SVG.',
      if: { arg: 'fluidWidth', eq: false }, // Only show if fluidWidth is false
    },
    fluidWidth: {
      control: 'boolean',
      description: 'If true, the tachometer will expand to fill its parent container width.',
    },
    showNeedle: {
      control: 'boolean',
      description: 'Whether to display the needle.',
    },
    // Add other props if your Tachometer component accepts them
  },
  // Default args that apply to all stories unless overridden
  args: {
    arcWidth: 20,
    height: 75,
    width: 150,
    maxValue: 100,
    minValue: 0,
    value: 50, // A common default value
    showNeedle: true,
    fluidWidth: false,
  },
};

// --- Stories ---

export const Default = {
  // `render` is used when you need custom JSX or wrappers around the component
  render: (args) => (
    <Box m="30px">
      {/* First Tachometer */}
      <Tachometer
        {...args} // Inherit common args, then override specific ones
        customSegmentStops={[-120, -100, 0]}
        maxValue={0}
        minValue={-120}
        segmentColors={['red', 'black']}
        value={-100}
      />
      {/* Second Tachometer */}
      <Tachometer
        {...args}
        customSegmentStops={[0, 50, 100]}
        segmentColors={['#F6B002', 'black']}
        value={50}
      />
      {/* Third Tachometer */}
      <Tachometer
        {...args}
        customSegmentStops={[0, 80, 100]}
        segmentColors={['#1DB510', 'black']}
        value={80}
      />
    </Box>
  ),
  // No specific args needed here, as they are defined within the render function
  // or inherited from the default export.
};

export const MultiColor = {
  args: {
    customSegmentStops: [0, 30, 80, 100],
    segmentColors: ['red', '#1DB510', 'black'],
    value: 80,
    // Inherits arcWidth, height, maxValue, minValue, width from default args
  },
};

export const WithFluidWidth = {
  // `render` is needed because we wrap Tachometer in different sized Boxes
  render: (args) => (
    <>
      <Box height="100px" m="30px" width="100px" style={{ border: '1px dashed #ccc' }}> {/* Added border for visibility */}
        <Tachometer
          {...args}
          arcWidth={10}
          customSegmentStops={[0, 80, 100]}
          fluidWidth // Set fluidWidth to true
          maxValue={100}
          minValue={0}
          segmentColors={['#1DB510', 'black']}
          value={80}
        />
      </Box>
      <Box height="300px" m="30px" width="300px" style={{ border: '1px dashed #ccc' }}> {/* Added border for visibility */}
        <Tachometer
          {...args}
          arcWidth={30}
          customSegmentStops={[0, 80, 100]}
          fluidWidth // Set fluidWidth to true
          maxValue={100}
          minValue={0}
          segmentColors={['#1DB510', 'black']}
          value={80}
        />
      </Box>
    </>
  ),
  args: {
    // Override default width/height because fluidWidth is true for these stories
    // These specific properties will be ignored by Tachometer if it truly uses fluidWidth,
    // but it's good to keep them here for clarity or if there's a fallback.
    // For `fluidWidth: true`, typically `height` and `width` props are not directly used by the component.
    height: undefined,
    width: undefined,
    fluidWidth: true, // Crucial for this story
  }
};

export const WithoutNeedle = {
  args: {
    showNeedle: false, // Set showNeedle to false
    customSegmentStops: [0, 80, 100],
    segmentColors: ['#1DB510', 'black'],
    value: 80,
    // Inherits other props from default args
  },
};

export const WithBottomText = {
  render: (args) => (
    <>
      <Box height={125} m="30px" width={150}>
        <Tachometer
          {...args}
          arcWidth={20}
          customSegmentStops={[0, 80, 100]}
          fluidWidth
          maxValue={100}
          minValue={0}
          segmentColors={['#1DB510', 'black']}
          value={80}
        />
        <Text
          display="table"
          mx="auto"
          tag="div"
          textAlign="center"
          type="button"
        >
          Alignment
        </Text>
      </Box>

      <Box height={75} m="30px" width={150}>
        <Tachometer
          {...args}
          arcWidth={20}
          customSegmentStops={[-120, -100, 0]}
          fluidWidth
          maxValue={0}
          minValue={-120}
          segmentColors={['red', 'black']}
          value={-100}
        />
        <Text
          display="table"
          mx="auto"
          px="20px"
          tag="div"
          textAlign="center"
          type="button"
        >
          Decisions and Delivery
        </Text>
      </Box>
    </>
  ),
  args: {
    // For these stories, fluidWidth is enabled, so default height/width will be ignored by Tachometer if it's coded correctly
    fluidWidth: true,
    height: undefined,
    width: undefined,
  }
};

export const WithHeaderText = {
  render: (args) => (
    <Box height={75} m="30px" width={150}>
      <Box
        color="#F85B6C"
        display="table"
        fontSize="36px"
        fontWeight="bold"
        mx="auto"
        textAlign="center"
      >
        -0.56
      </Box>
      <Tachometer
        {...args}
        arcWidth={20}
        customSegmentStops={[0, 48, 100]}
        fluidWidth
        maxValue={100}
        minValue={0}
        segmentColors={['red', 'black']}
        value={48}
      />
    </Box>
  ),
  args: {
    fluidWidth: true,
    height: undefined,
    width: undefined,
  }
};