import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import { users } from '../dummyLoginData';
import { useAuth } from '../context/AuthContext';
import {
  TeacherLoginContainer,
  TeacherLoginForm,
  TeacherLoginUsername,
  TeacherLoginPassword,
  TeacherLoginSubmit,
  TeacherOverlay,
  TeacherTitle,
  ForgotPasswordLink,
  SignUpText
} from './styles/TeacherLoginStyles';

const TeacherLogin: React.FC = () => {
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
        user.role === Roles.Teacher
    );
    if (user) {
      login(user.username, Roles.Teacher);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <TeacherLoginContainer>
      <TeacherOverlay>
        <TeacherTitle>Teacher Login</TeacherTitle>
        <TeacherLoginForm onSubmit={handleLogin}>
          <TeacherLoginUsername
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
          <TeacherLoginPassword
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <ForgotPasswordLink href="#">Forgot Password?</ForgotPasswordLink>
          <TeacherLoginSubmit type="submit">
            Login
          </TeacherLoginSubmit>
          <SignUpText>Don't have an account? <a href="#">Sign Up</a></SignUpText>
        </TeacherLoginForm>
      </TeacherOverlay>
    </TeacherLoginContainer>
  );
};

export default TeacherLogin;
