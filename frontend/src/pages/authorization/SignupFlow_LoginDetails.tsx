import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  FormInput,
  FormButton,
  ParentGridWithTwoColumns,
  SignupContentWrapper,
  LogoWrapper,
  ErrorMessage,
  ValidationNote,
} from '../styles';
import AuthFlowImages from './AuthorizationFlowContent';
import Logo from '../../assets/upshift_logo.png';

interface SignupFlow_LoginDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

const SignupFlow_LoginDetails: React.FC<SignupFlow_LoginDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleNext = (e: FormEvent): void => {
    e.preventDefault();
    const validationErrors: typeof errors = {};

    // Username validation: No spaces, only letters, numbers, and symbols
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]+$/;
    if (!username) {
      validationErrors.username = 'Username is required.';
    } else if (!usernameRegex.test(username)) {
      validationErrors.username =
        'Username can only contain letters, numbers, and symbols, and no spaces.';
    }

    // Password validation: At least 8 characters, mix of letters, numbers, and symbols
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        'Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(validationErrors);

    // If no errors, proceed to the next step
    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  return (
    <ParentGridWithTwoColumns>
      <SignupContentWrapper>
        <LogoWrapper>
          <img src={Logo} alt="Upshift Logo" />
        </LogoWrapper>
        <h2>Create Your Login Details</h2>
        <form onSubmit={handleNext}>
          <div>
            <FormInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: undefined }));
              }}
              style={{
                borderColor: errors.username ? 'red' : undefined,
                backgroundColor: errors.username ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
            <ValidationNote>
              (Username can only contain letters, numbers, and symbols, and no
              spaces.)
            </ValidationNote>
          </div>
          <div>
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: undefined }));
              }}
              style={{
                borderColor: errors.password ? 'red' : undefined,
                backgroundColor: errors.password ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <ValidationNote>
              (Password must be at least 8 characters long and include a mix of
              letters, numbers, and symbols.)
            </ValidationNote>
          </div>
          <div>
            <FormInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                setErrors(prev => ({
                  ...prev,
                  confirmPassword: undefined,
                }));
              }}
              style={{
                borderColor: errors.confirmPassword ? 'red' : undefined,
                backgroundColor: errors.confirmPassword ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </div>
          <FormButton type="submit">Next</FormButton>
          <FormButton type="button" onClick={onBack}>
            Back
          </FormButton>
        </form>
      </SignupContentWrapper>
      <AuthFlowImages />
    </ParentGridWithTwoColumns>
  );
};

export default SignupFlow_LoginDetails;
