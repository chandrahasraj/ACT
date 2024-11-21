import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  FormInput,
  FormButton,
  ParentGridWithTwoColumns,
  SignupContentWrapper, LogoWrapper,
} from '../styles';
import AuthFlowImages from './AuthorizationFlowContent';
import Logo from '../../assets/upshift_logo.png';

interface TeamMemberProps {
  onNext: () => void;
  onBack: () => void;
}

interface TeamMember {
  fullName: string;
  emailId: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ onNext, onBack }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { fullName: '', emailId: '' },
  ]);

  const addTeamMember = (): void => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { fullName: '', emailId: '' }]);
    } else {
      alert('You can only add up to 5 team members.');
    }
  };

  const handleChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ): void => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const handleNext = (e: FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  return (
    <ParentGridWithTwoColumns>
      <SignupContentWrapper>
        <LogoWrapper>
          <img src={Logo} alt="Upshift Logo" />
        </LogoWrapper>
        <form onSubmit={handleNext}>
          {teamMembers.map((member, index) => (
            <div key={index}>
              <FormInput
                type="text"
                placeholder={`Team Member ${index + 1} - Full Name`}
                value={member.fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, 'fullName', e.target.value)
                }
                required
              />
              <FormInput
                type="email"
                placeholder={`Team Member ${index + 1} - Email`}
                value={member.emailId}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, 'emailId', e.target.value)
                }
                required
              />
            </div>
          ))}
          <FormButton type="button" onClick={addTeamMember}>
            Add Team Member
          </FormButton>
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

export default TeamMember;
