import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import {
  HeaderDropdownMenu,
  HeaderHeader,
  HeaderLogoutButton,
  HeaderUsername,
  HeaderUsernameContainer,
  HeaderUsernameIcon,
  HeaderMenuButton,
  HeaderDropdownLink,
} from '../pages/styles/HeaderStyles';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [username, setUsername] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
    setTimeoutId(id);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <HeaderHeader>
        <HeaderMenuButton onClick={toggleSidebar}>
          <FaBars />
        </HeaderMenuButton>
        <HeaderUsernameContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <HeaderUsernameIcon>
            <FaUserCircle />
          </HeaderUsernameIcon>
          <HeaderUsername>{username}</HeaderUsername>
          {showDropdown && (
            <HeaderDropdownMenu>
              <HeaderDropdownLink to="/profile">Profile</HeaderDropdownLink>
              <HeaderDropdownLink to="/milestone">Milestone</HeaderDropdownLink>
              <HeaderDropdownLink to="/certificates">
                Certificates
              </HeaderDropdownLink>
              <HeaderDropdownLink to="/support">Support</HeaderDropdownLink>
              <HeaderDropdownLink to="/settings">Settings</HeaderDropdownLink>
              <HeaderLogoutButton onClick={handleLogout}>
                Log Out
              </HeaderLogoutButton>
            </HeaderDropdownMenu>
          )}
        </HeaderUsernameContainer>
      </HeaderHeader>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
