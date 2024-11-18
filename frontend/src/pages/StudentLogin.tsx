import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import { users } from '../dummyLoginData';
import { useAuth } from '../context/AuthContext';
import {
  StudentLoginContainer,
  StudentLoginForm,
  StudentLoginUsername,
  StudentLoginPassword,
  StudentLoginSubmit,
  StudentOverlay,
  StudentTitle,
} from './styles/StudentLoginStyles';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // Construct API endpoint from environment variable
    const apiUrl = `http://localhost:4000/login`;

    // Call the backend API for login
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        // role: Roles.Student, // Send the selected role for validation (if needed)
      }),
    });

    if (!response.ok) {
      // Handle non-200 responses
      const errorData = await response.json();
      alert('Invalid credentials');
      console.error('Error:', errorData.message);
      throw new Error(errorData.message || 'Invalid credentials');
    }

    // Extract data from response
    const token = response.headers.get('authorization')?.split('Bearer')[1];
    if (token) {
      login(username, Roles.Student, token);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <StudentLoginContainer>
      <StudentOverlay>
        <StudentTitle>Student Login</StudentTitle>
        <StudentLoginForm onSubmit={handleLogin}>
          <StudentLoginUsername
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
          <StudentLoginPassword
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <StudentLoginSubmit type="submit">Login</StudentLoginSubmit>
        </StudentLoginForm>
      </StudentOverlay>
    </StudentLoginContainer>
  );
};

export default StudentLogin;
