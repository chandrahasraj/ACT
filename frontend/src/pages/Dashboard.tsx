import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendarComponent from '../components/CalenderComponent';
import { teamsData } from '../dummyLoginData';
import {
  DashboardButtonDivContainer,
  DashboardCard,
  DashboardCardsContainer,
  DashboardContainer,
  DashboardDropdown,
  DS_H1,
  DashboardIdeaStatus,
  DashboardPageContainer,
  DashboardSectionHeader,
  DashboardSwitchButton,
  DashboardTable,
  DashboardTd,
  DashboardTeamProgressContainer,
  DashboardTeamProgressRow,
  DashboardTh,
} from './styles/DashboardStyles';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, validateToken } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  };

  const data = {
    teams: 8,
    students: 120,
    coursePercentage: 85,
    ideas: 15,
  };

  return (
    <DashboardPageContainer>
      <Header key={username} />
      <DashboardContainer>
        <DS_H1>Dashboard</DS_H1>
        <DashboardCardsContainer>
          <DashboardCard>
            <h3>Teams</h3>
            <p>{data.teams}</p>
          </DashboardCard>
          <DashboardCard>
            <h3>Students</h3>
            <p>{data.students}</p>
          </DashboardCard>
          <DashboardCard>
            <h3>Course Percentage</h3>
            <p>{data.coursePercentage}%</p>
          </DashboardCard>
          <DashboardCard>
            <h3>Ideas</h3>
            <p>{data.ideas}</p>
          </DashboardCard>
        </DashboardCardsContainer>
        <CalendarComponent />
        <DashboardTeamProgressContainer>
          <DashboardSectionHeader>Team Progress</DashboardSectionHeader>
          <DashboardTeamProgressRow>
            <DashboardDropdown onChange={handleTeamChange} value={selectedTeam}>
              <option value="" hidden>
                Select Team
              </option>
              {Object.keys(teamsData).map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </DashboardDropdown>

            {selectedTeam && (
              <DashboardIdeaStatus>
                <span>Idea Status: {teamsData[selectedTeam].ideaStatus}</span>
              </DashboardIdeaStatus>
            )}

            {selectedTeam && (
              <DashboardButtonDivContainer>
                <DashboardSwitchButton
                  $isDisabled={
                    teamsData[selectedTeam].ideaStatus === 'Not Started'
                  }>
                  View Idea
                </DashboardSwitchButton>
                <DashboardSwitchButton
                  $isDisabled={
                    teamsData[selectedTeam].ideaStatus === 'Not Started'
                  }>
                  Change
                </DashboardSwitchButton>
              </DashboardButtonDivContainer>
            )}
          </DashboardTeamProgressRow>

          {selectedTeam && (
            <DashboardTable>
              <thead>
                <tr>
                  <DashboardTh>Name</DashboardTh>
                  <DashboardTh>Lesson Progress</DashboardTh>
                  <DashboardTh>Idea Submission</DashboardTh>
                  <DashboardTh>Post Survey</DashboardTh>
                  <DashboardTh>Certificate</DashboardTh>
                </tr>
              </thead>
              <tbody>
                {teamsData[selectedTeam].students.map((student, index) => (
                  <tr key={index}>
                    <DashboardTd>{student.name}</DashboardTd>
                    <DashboardTd>{student.lessonProgress}</DashboardTd>
                    <DashboardTd>{student.ideaSubmission}</DashboardTd>
                    <DashboardTd>{student.postSurvey}</DashboardTd>
                    <DashboardTd>{student.certificate}</DashboardTd>
                  </tr>
                ))}
              </tbody>
            </DashboardTable>
          )}
        </DashboardTeamProgressContainer>
      </DashboardContainer>
      <Footer />
    </DashboardPageContainer>
  );
};

export default Dashboard;
