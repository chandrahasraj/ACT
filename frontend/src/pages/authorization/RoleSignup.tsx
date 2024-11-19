import React, { useState, ChangeEvent } from 'react';
import { FormInput, FormButton } from '../styles/LoginStyles';

interface RoleSignupProps {
  onNext: () => void;
}

const RoleSignup: React.FC<RoleSignupProps> = ({ onNext }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');

  const handleNext = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <FormInput
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFirstName(e.target.value)
        }
        required
      />
      <FormInput
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLastName(e.target.value)
        }
        required
      />
      <FormInput
        type="text"
        placeholder="Institution"
        value={institution}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInstitution(e.target.value)
        }
        required
      />
      <FormInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
      />
      <FormInput
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
        required
      />
      <FormButton type="submit">Next</FormButton>
    </form>
  );
};

export default RoleSignup;
