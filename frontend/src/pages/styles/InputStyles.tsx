import styled from 'styled-components';

export const FormInput = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 5px; /* Reduce space between input and validation note */
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #f8f8f8;

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: #ffffff;
  }
`;

export const FormLabel = styled.label`
  color: #000;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
`;

export const StyledSelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledSelect = styled.select<{ isVisible: boolean }>`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f8f8f8;
  outline: none;
  cursor: pointer;
  appearance: none; /* Hides default dropdown arrow */

  option {
    font-family: 'Arial', sans-serif;
  }

  ${({ isVisible }) =>
    !isVisible &&
    `
    height: 50px; /* Ensures dropdown is closed initially */
    overflow: hidden;
  `}

  &:hover {
    border-color: #007bff;
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

export const StyledSelectOption = styled.option`
  padding: 5px;
  font-size: 16px;
  color: #000;
  font-family: 'Arial', sans-serif;
  background-color: #fff;

  &:hover {
    background-color: #e6f7ff;
  }
`;
