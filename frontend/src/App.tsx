import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Teams from './pages/Teams';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Profile from './pages/Profile';
import Milestone from './pages/Milestone';
import Settings from './pages/Settings';
import Certificates from './pages/Certificates';
import Login from './pages/Login';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/courses" element={<ProtectedRoute element={<Courses />} />} />
          <Route path="/teams" element={<ProtectedRoute element={<Teams />} />} />
          <Route path="/resources" element={<ProtectedRoute element={<Resources />} />} />
          <Route path="/FAQ" element={<ProtectedRoute element={<FAQ />} />} />
          <Route path="/support" element={<ProtectedRoute element={<Support />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/certificates" element={<ProtectedRoute element={<Certificates />} />} />
          <Route path="/milestone" element={<ProtectedRoute element={<Milestone />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
