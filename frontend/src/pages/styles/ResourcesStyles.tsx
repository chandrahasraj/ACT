import styled from 'styled-components';

export const ResourceContainer = styled.div`
  padding: 20px;
`;

export const ResourceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export const ViewButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
`;

export const ResourceFrame = styled.div`
  position: relative;
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
`;
