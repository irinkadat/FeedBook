import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../styles/Navigation.css';
import ramen from '../assets/ramen.png';

const Navigation = ({ isAuthenticated, onSignOut }) => {
  console.log('Is Authenticated:', isAuthenticated);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await onSignOut(); 

      navigate('/signin');
    } catch (error) {
      console.error('Sign Out failed:', error);
    }
  };

  return (
    <nav className="navigation">
      <ul className="nav-links">
        <Link to="/">
          <img className='logo' src={ramen} alt="logo" />
        </Link>
        <li className='home-link'><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li><Link to="/settings">Settings</Link></li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
            
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
