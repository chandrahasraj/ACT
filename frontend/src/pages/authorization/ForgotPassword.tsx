import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FormInput, FormButton } from '../styles';

interface ForgotPasswordProps {
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setShowForgotPassword,
}) => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleNext = (): void => setStep(prev => prev + 1);
  const handleBack = (): void => setStep(prev => prev - 1);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (step === 1) {
      // Simulate API call to send verification code
      handleNext();
    } else if (step === 2) {
      if (verificationCode === '1234') {
        handleNext();
      } else {
        alert('Invalid verification code.');
      }
    } else if (step === 3) {
      if (newPassword === confirmPassword) {
        alert('Password reset successful.');
        setShowForgotPassword(false);
      } else {
        alert('Passwords do not match.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <FormInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <FormButton type="submit">Submit</FormButton>
        </>
      )}
      {step === 2 && (
        <>
          <FormInput
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setVerificationCode(e.target.value)
            }
            required
          />
          <FormButton type="submit">Verify</FormButton>
          <FormButton type="button" onClick={handleBack}>
            Back
          </FormButton>
        </>
      )}
      {step === 3 && (
        <>
          <FormInput
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            required
          />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
          <FormButton type="submit">Reset Password</FormButton>
          <FormButton type="button" onClick={handleBack}>
            Back
          </FormButton>
        </>
      )}
    </form>
  );
};

export default ForgotPassword;
