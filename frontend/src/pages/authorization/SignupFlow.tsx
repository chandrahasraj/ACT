import React, { useState } from 'react';
import SignupFlow_Registration from './SignupFlow_Registration';
import SignupFlow_LoginDetails from './SignupFlow_LoginDetails';

interface SignupFlowProps {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const SignupFlow: React.FC<SignupFlowProps> = ({
  setShowSignup,
  setSelectedRole,
}) => {
  const [signupStep, setSignupStep] = useState<number>(0);

  const handleNext = (): void => setSignupStep(prev => prev + 1);
  const handleBack = (): void => {
    if (signupStep === 0) {
      setShowSignup(false); // Go back to login if on the first step
    } else {
      setSignupStep(prev => prev - 1); // Otherwise, go back one step
    }
  };

  const handleCancelSignup = (): void => {
    setSelectedRole(null); // Clear the selected role
    setShowSignup(false); // Return to login page
  };

  return (
    <>
      {signupStep === 0 && (
        <SignupFlow_Registration
          onNext={handleNext}
          onBack={handleCancelSignup} // Reset and go back to login
        />
      )}
      {signupStep === 1 && (
        <SignupFlow_LoginDetails onNext={handleNext} onBack={handleBack} />
      )}
      {signupStep === 2 && (
        <div>
          <h2>Signup Complete</h2>
          <button onClick={handleCancelSignup}>Go to Login</button>
        </div>
      )}
    </>
  );
};

export default SignupFlow;
