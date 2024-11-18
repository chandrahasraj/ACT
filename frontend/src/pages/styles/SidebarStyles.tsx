import styled from 'styled-components';

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
  height: 100vh;
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 1000;
`;

export const SidebarToggle = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 60px; /* To allow space for the toggle button */
`;

export const SidebarNavItem = styled.li`
  padding: 10px 20px;
`;

export const SidebarLink = styled.button`
  color: white;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  &:hover {
    color: #aaa;
  }
`;
