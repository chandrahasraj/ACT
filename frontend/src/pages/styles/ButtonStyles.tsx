import styled from 'styled-components';

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  background-color: #003a75;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #002a5e;
  }
`;
