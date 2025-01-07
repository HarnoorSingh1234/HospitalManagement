/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useRef, useEffect } from 'react';
import PatientDashboard from './pages/PatientDashboardPage'
import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  const teamRef = useRef(null);

  const scrollToTeam = () => {
    if (teamRef.current) {
      teamRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <AppWrapper scrollToTeam={scrollToTeam} teamRef={teamRef} />
    </Router>
  );
}

const AppWrapper = ({ scrollToTeam, teamRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#team') {
      scrollToTeam();
    }
  }, [location, scrollToTeam]);

  const navigateToTeam = () => {
    navigate('/#team');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} handleLogout={() => {}} navigateToTeam={navigateToTeam} />
      <Routes>
        <Route path="/" element={<LandingPage teamRef={teamRef} />} />
        <Route path="/dashboard" element={<PatientDashboard />} /> {/* Patient Dashboard Route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
