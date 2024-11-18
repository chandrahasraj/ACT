// Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import {
  SidebarContainer,
  SidebarToggle,
  SidebarNav,
  SidebarNavItem,
  SidebarLink,
} from '../pages/styles/SidebarStyles';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleSidebar(); // Close sidebar after navigation
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarToggle onClick={toggleSidebar}>
        <FaBars />
      </SidebarToggle>
      {isOpen && (
        <SidebarNav>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/dashboard')}>
              Dashboard
            </SidebarLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/courses')}>
              Courses
            </SidebarLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/teams')}>
              Teams
            </SidebarLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/resources')}>
              Resources
            </SidebarLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/faq')}>
              FAQ
            </SidebarLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarLink onClick={() => handleNavigation('/support')}>
              Support
            </SidebarLink>
          </SidebarNavItem>
        </SidebarNav>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
