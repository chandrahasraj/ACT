import styled from 'styled-components';

export const AuthFlowContainer = styled.div`
  grid-column: 2; /* Places the container in the second column */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%; /* Adjust to leave some space at the top and bottom */
  width: 90%; /* Adjust to leave space on the sides */
  margin: auto; /* Centers within the column */
  border-radius: 20px; /* Rounded rectangle */
  background-color: #6b6d72; /* Background for the content */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
`;

export const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #ddd;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #007bff;
    }

    &.active {
      background-color: #007bff;
    }
  }
`;
