import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FormInput, FormButton } from '../styles/LoginStyles';

interface MentorProps {
  onNext: () => void;
  onBack: () => void;
}

const Mentor: React.FC<MentorProps> = ({ onNext, onBack }) => {
  const [mentorName, setMentorName] = useState<string>('');
  const [mentorEmail, setMentorEmail] = useState<string>('');

  const handleNext = (e: FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <FormInput
        type="text"
        placeholder="Mentor Name"
        value={mentorName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMentorName(e.target.value)
        }
        required
      />
      <FormInput
        type="email"
        placeholder="Mentor Email"
        value={mentorEmail}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMentorEmail(e.target.value)
        }
        required
      />
      <FormButton type="submit">Finish</FormButton>
      <FormButton type="button" onClick={onBack}>
        Back
      </FormButton>
    </form>
  );
};

export default Mentor;