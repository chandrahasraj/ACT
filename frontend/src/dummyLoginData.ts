import { Team } from './models/Team';
import { User } from './models/User';

export const users: User[] = [
  {
    username: 'teacher1',
    password: 'password123',
    role: 'teacher',
  },
  {
    username: 'student1',
    password: 'password123',
    role: 'student',
  },
  {
    username: 'admin1',
    password: 'password123',
    role: 'admin',
  },
];

export const teamsData: Record<string, Team> = {
  TeamA: {
    ideaStatus: 'Submitted',
    students: [
      {
        name: 'John Doe',
        lessonProgress: '80%',
        ideaSubmission: 'Submitted',
        postSurvey: 'Completed',
        certificate: 'Yes',
      },
      {
        name: 'Jane Smith',
        lessonProgress: '90%',
        ideaSubmission: 'Submitted',
        postSurvey: 'Pending',
        certificate: 'No',
      },
    ],
  },
  TeamB: {
    ideaStatus: 'Not Started',
    students: [
      {
        name: 'Alice Brown',
        lessonProgress: '70%',
        ideaSubmission: 'Not Started',
        postSurvey: 'Not Started',
        certificate: 'No',
      },
      {
        name: 'Bob White',
        lessonProgress: '50%',
        ideaSubmission: 'Not Started',
        postSurvey: 'Not Started',
        certificate: 'No',
      },
    ],
  },
  TeamC: {
    ideaStatus: 'Not Started',
    students: [
      {
        name: 'Nigger',
        lessonProgress: '70%',
        ideaSubmission: 'Not Started',
        postSurvey: 'Not Started',
        certificate: 'No',
      },
      {
        name: 'chinaong',
        lessonProgress: '50%',
        ideaSubmission: 'Not Started',
        postSurvey: 'Not Started',
        certificate: 'No',
      },
    ],
  },
  TeamD: {
    ideaStatus: 'Submitted',
    students: [
      {
        name: 'Adipurush',
        lessonProgress: '80%',
        ideaSubmission: 'Submitted',
        postSurvey: 'Completed',
        certificate: 'Yes',
      },
      {
        name: 'Kalki',
        lessonProgress: '90%',
        ideaSubmission: 'Submitted',
        postSurvey: 'Pending',
        certificate: 'No',
      },
    ],
  },
};
