import React, { useState } from 'react';
import RoleSignup from './RoleSignup';
import TeamMember from './TeamMember';
import Mentor from './Mentor';

interface SignupProps {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignupProps> = ({ setShowSignup }) => {
  const [signupStep, setSignupStep] = useState<number>(0);

  const handleNext = (): void => setSignupStep(prev => prev + 1);
  const handleBack = (): void => setSignupStep(prev => prev - 1);

  return (
    <>
      {signupStep === 0 && <RoleSignup onNext={handleNext} />}
      {signupStep === 1 && (
        <TeamMember onNext={handleNext} onBack={handleBack} />
      )}
      {signupStep === 2 && <Mentor onNext={handleNext} onBack={handleBack} />}
      {signupStep === 3 && (
        <div>
          <h2>Signup Complete</h2>
          <button onClick={() => setShowSignup(false)}>Go to Login</button>
        </div>
      )}
    </>
  );
};

export default Signup;
