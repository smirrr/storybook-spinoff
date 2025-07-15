import React from 'react';
import PropTypes from 'prop-types';

import { checkmarkFilled } from '../IconLib';
import Box from '../Box';
import Icon from '../Icon';

const getLabelColor = (index, activeStep) => {
  if (index < activeStep) {
    return 'grey.20';
  }
  if (index > activeStep) {
    return 'grey.50';
  }
  return 'blue.50';
};

const Step = ({ index, label, activeStep }) => (
  <Box flex="1" p="0" position="relative" userSelect="none">
    {index > 0 && (
      <Box
        left="calc(-50% + 12px)"
        position="absolute"
        right="calc(50% + 12px)"
        top="12px"
      >
        <Box borderTop="1px solid" borderTopColor="grey.70" />
      </Box>
    )}
    <Box align-items="center" d="flex" flexDirection="column">
      <Box d="flex">
        <Box d="inline-block" h="4" m="0 auto" w="4">
          {index < activeStep && (
            <Icon
              color="green.50"
              icon={checkmarkFilled}
              left="-1px"
              position="relative"
              size="26px"
              top="-1px"
            />
          )}
          {index >= activeStep && (
            <Box
              backgroundColor={`${index > activeStep ? 'grey.80' : 'blue.50'}`}
              borderRadius="50%"
              color={`${index > activeStep ? 'black' : 'white'}`}
              d="inline-block"
              fontSize="size12"
              fontWeight="medium"
              h="4"
              lineHeight="size24"
              textAlign="center"
              w="4"
            >
              {index + 1}
            </Box>
          )}
        </Box>
      </Box>
      {label && (
        <Box d="flex" justifyContent="center" w="100%">
          <Box
            borderBottom="2px solid"
            borderBottomColor={`${
              activeStep === index ? 'blue.50' : 'transparent'
            }`}
            color={getLabelColor(index, activeStep)}
            fontSize="size16"
            fontWeight={`${index > activeStep ? 'normal' : 'bold'}`}
            lineHeight="1.4"
            mt="4"
            pb="8"
            textAlign="center"
            width="min(200px, 100%)"
          >
            {label}
          </Box>
        </Box>
      )}
    </Box>
  </Box>
);

Step.propTypes = {
  /**
   * Index of active step
   */
  activeStep: PropTypes.number.isRequired,
  /**
   * Index of label
   */
  index: PropTypes.number.isRequired,
  /**
   * Step label
   */
  label: PropTypes.string.isRequired
};

Step.defaultProps = {};

const Stepper = ({ labels, activeIndex }) => {
  return (
    <Box alignItems="flex-start" d="flex" flexDirection="row">
      {labels.map((step, i) => (
        <Step
          activeStep={activeIndex}
          index={i}
          key={step.id}
          label={step.label}
        />
      ))}
    </Box>
  );
};

Stepper.propTypes = {
  /**
   * Index of the active label
   */
  activeIndex: PropTypes.number.isRequired,
  /**
   * Labels for all the steps
   */
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};

Stepper.defaultProps = {};

Stepper.displayName = 'Stepper';

export default Stepper;
