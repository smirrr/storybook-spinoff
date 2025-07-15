import React, {  useState } from 'react';
import Box from '../Box';
import RadioButton from './index';

export default {
  title: 'Atoms/RadioButton',
  component: RadioButton,
   parameters: {
      layout: "centered",
    },
    tags: ["autodocs"],
};

export const DefaultRadioButton = (args) => {
  const [val, setVal] = useState(null);
  return (
    <>
      <RadioButton
        id="1"
        name="sample1"
        onChange={() => {
          setVal('test1');
        }}
        selectedValue={val}
        value="test1"
        {...args}
      >
        test1
      </RadioButton>
    </>
  );
};

export const selectedRadioButton = () => {
  return (
    <>
      <RadioButton
        id="2"
        name="sample2"
        onChange={() => {}}
        selectedValue="test1"
        value="test1"
      >
        test1
      </RadioButton>
    </>
  );
};

export const GroupOfRadioButtons = () => {
    const [btn, setBtn] = useState('test1');
    return (
      <>
        <Box d="flex">
          {[1, 2, 3].map(b => (
            <Box key={b} mr="30px">
              <RadioButton
                id={`rb${b}`}
                name="group"
                onChange={() => {
                  setBtn(`test${b}`);
                }}
                selectedValue={btn}
                value={`test${b}`}
              >
                test{b}
              </RadioButton>
            </Box>
          ))}
        </Box>
      </>
    );
};

export const GroupOfRadioButtonsWithConfirmAction = () => {
    const [btn, setBtn] = useState('test1');
    const [modal, setModal] = useState();
    const modalAction = (confirm = false) => {
      if (confirm) setBtn(modal);
      setModal(null);
    };
    return (
      <>
        <Box d="flex">
          {[1, 2, 3].map(b => (
            <Box key={b} mr="30px">
              <RadioButton
                id={`rba${b}`}
                name="groupAction"
                onChange={() => {
                  setModal(`test${b}`);
                }}
                selectedValue={btn}
                value={`test${b}`}
              >
                test{b}
              </RadioButton>
            </Box>
          ))}
        </Box>
        <Box h="80px" mt="20px">
          {modal && (
            <>
              Confirm action box
              <Box d="flex" mt="20px">
                <Box
                  bg="blue.90"
                  mr="20px"
                  onClick={() => modalAction(true)}
                  p="5px"
                >
                  OK
                </Box>
                <Box onClick={() => modalAction(false)} p="5px">
                  Cancel
                </Box>
              </Box>
            </>
          )}
        </Box>
      </>
    );
};
