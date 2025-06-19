import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Logo from './logo.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Check if user logged in
  useEffect(() => {
    // Get Id from localStorage
    const storedUserID = localStorage.getItem('userID');
    setIsLoggedIn(!!storedUserID);
  }, []);
//Sign out function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      localStorage.removeItem('userID');
      navigate('/login');
    }
  };

  return (
    <header className="relative bg-img h-32 text-white flex items-center px-6">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="logo">
              <NavLink to="/">
                <img src={Logo} alt="CVGen logo" style={{ width: '50px' }} />
              </NavLink>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <nav className="ml-auto navigation">
             {/* Show different menu depending if user is logged in */}
              {isLoggedIn ? (
                <>
                {/* If user id exists, show dashboard and logout menu */}
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'active' : 'link')}
                  >
                    Dashboard
                  </NavLink>
                  {' | '}
                  <button onClick={handleLogout} className="link" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    Log Out
                  </button>
                </>
              ) : (
                <>
                 {/* If user id does not exist, show registration and login options */}
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? 'active' : 'link')}
                  >
                    Register
                  </NavLink>
                  {' | '}
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'active' : 'link')}
                  >
                    Login
                  </NavLink>
                </>
              )}
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;