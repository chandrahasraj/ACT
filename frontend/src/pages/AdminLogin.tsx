import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import { users } from '../dummyLoginData';
import { useAuth } from '../context/AuthContext';
import {
  AdminLoginContainer,
  AdminLoginForm,
  AdminLoginUsername,
  AdminLoginPassword,
  AdminLoginSubmit,
  AdminOverlay,
  AdminTitle
} from './styles/AdminLoginStyles';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === Roles.Admin
    );
    if (user) {
      login(user.username, Roles.Admin);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <AdminLoginContainer>
      <AdminOverlay>
        <AdminTitle>Admin Login</AdminTitle>
        <AdminLoginForm onSubmit={handleLogin}>
          <AdminLoginUsername
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
          <AdminLoginPassword
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <AdminLoginSubmit type="submit">
            Login
          </AdminLoginSubmit>
        </AdminLoginForm>
      </AdminOverlay>
    </AdminLoginContainer>
  );
};

export default AdminLogin;
