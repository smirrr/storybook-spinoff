/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Text from '../Text';
import { DropdownButton } from '../Button';

const TickerButton = ({ content, action, isDisabled }) => (
  <Box
    cursor="pointer"
    height={24}
    lineHeight="24px"
    onClick={() => {
      if (!isDisabled) action();
    }}
    opacity={isDisabled ? 0.5 : 1}
  >
    {content}
  </Box>
);

const UnitPicker = ({
  ctaLabel,
  unit,
  value,
  isDisabled,
  noUnitSuffix,
  onConfirm,
  placeholder,
  unitOptions,
  valueRange
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || valueRange.min);
  const [selectedUnit, setSelectedUnit] = useState(unit);

  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef]);

  const increment = () => {
    setSelectedValue(selectedValue + 1);
  };

  const decrement = () => {
    setSelectedValue(selectedValue - 1);
  };

  const isCtaDisabled = () => {
    return unitOptions?.length > 0
      ? !selectedUnit || !selectedValue
      : !selectedValue;
  };

  const getUnitText = (quantity, unitName) => {
    const u = unitName.toLowerCase();
    if (u.substr(-1) === 's' && quantity === 1) {
      return `${quantity} ${u.slice(0, -1)}`;
    }
    return `${quantity} ${u}`;
  };

  const getDropdownText = () => {
    if (unitOptions?.length) {
      return value && unit ? getUnitText(value, unit) : placeholder;
    }
    return value ? getUnitText(value, noUnitSuffix) : placeholder;
  };

  const onCtaClick = () => {
    setIsPickerOpen(false);
    const output = {
      value: selectedValue
    };
    if (unitOptions?.length) output.unit = selectedUnit;
    onConfirm(output);
  };

  return (
    <Box d="inline-flex" position="relative" ref={pickerRef}>
      <DropdownButton
        isDisabled={isDisabled}
        isOpen={isPickerOpen}
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        size="large"
      >
        {getDropdownText()}
      </DropdownButton>
      {isPickerOpen && (
        <Box
          bg="white"
          borderRadius={2}
          boxShadow="0px 5px 10px 1px rgba(0,0,0,0.1)"
          mt={6}
          p="12px 16px 24px"
          position="absolute"
          top={40}
          w={180}
        >
          <Box alignItems="center" d="flex" justifyContent="center" mb={6}>
            <Box
              color="grey.20"
              flex="0.5"
              fontSize={12}
              px={4}
              textAlign="center"
            >
              {/* disable if selected value is equal or more than max */}
              <TickerButton
                action={increment}
                content="▲"
                isDisabled={selectedValue >= valueRange.max}
              />
              <Box
                border="1px solid"
                borderColor="grey.70"
                borderRadius={2}
                boxShadow="0px 5px 10px 1px rgba(0,0,0,0.1)"
                color="grey.10"
                d="inline-block"
                fontSize={14}
                height={32}
                lineHeight={5}
                minWidth={50}
                my={3}
                px={2}
                textAlign="center"
              >
                {selectedValue}
              </Box>
              {/* disable if selected value is equal or less than min */}
              <TickerButton
                action={decrement}
                content="▼"
                isDisabled={selectedValue <= valueRange.min}
              />
            </Box>
            {unitOptions?.length > 0 && (
              <Box
                flex="0.5"
                px={4}
                textAlign="center"
                textTransform="lowercase"
              >
                {unitOptions.map(i => (
                  <Text
                    color={selectedUnit === i ? 'grey.10' : 'grey.50'}
                    cursor="pointer"
                    key={i}
                    my={6}
                    onClick={() => setSelectedUnit(i)}
                    type="note"
                  >
                    {i}
                  </Text>
                ))}
              </Box>
            )}
          </Box>
          <Box
            border="1px solid"
            borderColor="blue.50"
            borderRadius={2}
            color="blue.50"
            cursor={isCtaDisabled() ? 'auto' : 'pointer'}
            fontSize={14}
            fontWeight={600}
            height={32}
            lineHeight={4}
            onClick={onCtaClick}
            opacity={isCtaDisabled() ? 0.3 : 1}
            textAlign="center"
            variant="secondary"
            w="100%"
          >
            {ctaLabel}
          </Box>
        </Box>
      )}
    </Box>
  );
};

UnitPicker.propTypes = {
  /**
   * Label for confirm cta
   */
  ctaLabel: PropTypes.string,
  /**
   * Disabled state
   */
  isDisabled: PropTypes.bool,
  /**
   * Suffix to use when unit options are not there
   */
  noUnitSuffix: PropTypes.string,
  /**
   * Get value and unit on confirm
   */
  onConfirm: PropTypes.func.isRequired,
  /**
   * Placeholder for dropdown
   */
  placeholder: PropTypes.string,
  /**
   * Initialized unit
   */
  unit: PropTypes.string,
  /**
   * Pass options for units
   */
  unitOptions: PropTypes.arrayOf(PropTypes.string),
  /**
   * Initialized value
   */
  value: PropTypes.number,
  /**
   * Pass the range for value
   */
  valueRange: PropTypes.shape({
    max: PropTypes.string,
    min: PropTypes.string
  })
};

UnitPicker.defaultProps = {
  ctaLabel: 'Confirm',
  isDisabled: false,
  noUnitSuffix: 'times',
  placeholder: 'Select',
  unit: '',
  unitOptions: [],
  value: 1,
  valueRange: {
    max: 10,
    min: 1
  }
};

UnitPicker.displayName = 'UnitPicker';

export default UnitPicker;
