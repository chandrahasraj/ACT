import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderHeader = styled.header`
  background-color: #f9f9f9;
  padding: 10px 20px;
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HeaderMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
  color: inherit;

  &:hover {
    color: #007bff;
  }
`;

export const HeaderUsernameContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
`;

export const HeaderUsername = styled.span`
  font-size: 16px;
  color: #000;
  margin-left: 8px;
`;

export const HeaderUsernameIcon = styled.div`
  font-size: 20px;
  color: #000;
`;

export const HeaderDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 8px;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    top: 50px;
    right: 0;
    left: 0;
  }
`;

export const HeaderLogoutButton = styled.button`
  display: block;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #ff6666;
  }
`;

export const HeaderDropdownLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: #000;
  text-decoration: none;
  background-color: #f9f9f9;

  &:hover {
    background-color: #e2e2e2;
  }
`;
