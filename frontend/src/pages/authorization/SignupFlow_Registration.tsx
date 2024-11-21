import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  FormButton,
  FormInput,
  LoginLinkWrapper,
  LogoWrapper,
  MediumTitle,
  ParentGridWithTwoColumns,
  SignupContentWrapper,
  ErrorMessage,
  GlobalErrorWrapper,
  StyledSelect,
  SelectArrow,
  StyledSelectWrapper, StyledSelectOption,
} from '../styles';
import { useNavigate } from 'react-router-dom';
import AuthFlowImages from './AuthorizationFlowContent';
import Logo from '../../assets/upshift_logo.png';

interface SignupFlow_RegistrationProps {
  onNext: () => void;
  onBack: () => void;
}

const SignupFlow_Registration: React.FC<SignupFlow_RegistrationProps> = ({
  onNext,
  onBack,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    institution?: string;
    email?: string;
    dob?: string;
  }>({});
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch institutions from the backend
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch('http://localhost:4000/institutions');
        if (!response.ok) {
          throw new Error('Failed to fetch institutions');
        }
        const data = await response.json();
        setInstitutions(data);
      } catch (error) {
        // handleGlobalError();
        setInstitutions(['institution 1', 'institution 2']);
      }
    };
    fetchInstitutions();
  }, []);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `http://localhost:4000/check-email?email=${email}`
      );
      if (!response.ok) {
        throw new Error('Failed to check email');
      }
      const data = await response.json();
      return data.exists;
    } catch (error) {
      // handleGlobalError();
      return false;
    }
  };

  const handleGlobalError = () => {
    setGlobalError(
      'We are having issues processing your request. Please try after some time.'
    );
    navigate('/'); // Redirect to the home page
    setTimeout(() => {
      setGlobalError(null);
    }, 3000); // Clear the error after 3 seconds
  };

  const handleNext = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const validationErrors: typeof errors = {};

    // First Name validation
    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName) {
      validationErrors.firstName = 'First Name is required.';
    } else if (!nameRegex.test(firstName)) {
      validationErrors.firstName = 'First Name must only contain letters.';
    } else if (firstName.length > 20) {
      validationErrors.firstName =
        'First Name must be less than 20 characters.';
    }

    // Last Name validation
    if (!lastName) {
      validationErrors.lastName = 'Last Name is required.';
    } else if (!nameRegex.test(lastName)) {
      validationErrors.lastName = 'Last Name must only contain letters.';
    } else if (lastName.length > 20) {
      validationErrors.lastName = 'Last Name must be less than 20 characters.';
    }

    // Email validation
    if (!email) {
      validationErrors.email = 'Email is required.';
    } else if (await checkEmailExists(email)) {
      validationErrors.email = 'This email is already registered.';
    }

    // Date of Birth validation
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (!dob) {
      validationErrors.dob = 'Date of Birth is required.';
    } else if (dobDate > today) {
      validationErrors.dob = 'Date of Birth cannot be in the future.';
    } else if (age > 100) {
      validationErrors.dob = 'Seriously! You are over 100 years of age!!';
    }

    setErrors(validationErrors);

    // If no errors, proceed to the next step
    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  const handleArrowClick = () => {
    setIsDropdownVisible(prev => !prev);
  };

  return (
    <ParentGridWithTwoColumns>
      {globalError && <GlobalErrorWrapper>{globalError}</GlobalErrorWrapper>}
      <SignupContentWrapper>
        <LogoWrapper>
          <img src={Logo} alt="Upshift Logo" />
        </LogoWrapper>
        <MediumTitle>Welcome to Upshift!</MediumTitle>
        <form onSubmit={handleNext}>
          <div>
            <FormInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFirstName(e.target.value);
                setErrors(prev => ({ ...prev, firstName: undefined }));
              }}
              style={{
                borderColor: errors.firstName ? 'red' : undefined,
                backgroundColor: errors.firstName ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </div>
          <div>
            <FormInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
                setErrors(prev => ({ ...prev, lastName: undefined }));
              }}
              style={{
                borderColor: errors.lastName ? 'red' : undefined,
                backgroundColor: errors.lastName ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </div>
          <div>
            <StyledSelectWrapper>
              <StyledSelect
                value={institution}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setInstitution(e.target.value)
                }
                isVisible={isDropdownVisible}
                required>
                <StyledSelectOption value="" disabled>
                  Select Institution
                </StyledSelectOption>
                {institutions.map(inst => (
                  <StyledSelectOption key={inst} value={inst}>
                    {inst}
                  </StyledSelectOption>
                ))}
              </StyledSelect>
              <SelectArrow
                onClick={handleArrowClick}
                title="Click to toggle dropdown">
                ▼
              </SelectArrow>
            </StyledSelectWrapper>
            {errors.institution && (
              <ErrorMessage>{errors.institution}</ErrorMessage>
            )}
          </div>
          <div>
            <FormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
              style={{
                borderColor: errors.email ? 'red' : undefined,
                backgroundColor: errors.email ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>
          <div>
            <FormInput
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDob(e.target.value);
                setErrors(prev => ({ ...prev, dob: undefined }));
              }}
              style={{
                borderColor: errors.dob ? 'red' : undefined,
                backgroundColor: errors.dob ? '#ffe6e6' : undefined,
              }}
              required
            />
            {errors.dob && <ErrorMessage>{errors.dob}</ErrorMessage>}
          </div>
          <FormButton type="submit">Next</FormButton>
          <LoginLinkWrapper>
            Already have an account?{' '}
            <a href="#" onClick={onBack}>
              Login
            </a>
          </LoginLinkWrapper>
        </form>
      </SignupContentWrapper>
      <AuthFlowImages />
    </ParentGridWithTwoColumns>
  );
};

export default SignupFlow_Registration;
