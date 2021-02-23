import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import UserModel from '../../models/UserModel';

import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

import './Header.css';

const Header = props => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(function () {
    if (localStorage.getItem('uid')) {
      UserModel.show().then((response) => {
        setUser(response.data);
      });
    }
    // eslint-disable-next-line
  }, []);

  function logout() {
    setUser(null);
    localStorage.clear();
  }
  return (
    <header>
      <NavLink to='/'>
        <div>C</div>
        <div>L</div>
        <div>A</div>
        <div>S</div>
        <div>S</div>
        <div>I</div>
        <div>G</div>
        <div>N</div>
        <div>M</div>
        <div>E</div>
        <div>N</div>
        <div>T</div>
      </NavLink>
      <div className='links'>
        <ul>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>
                <NavLink to={'/courses'}>Courses</NavLink>
              </li>
              <li className='logout-btn btn' onClick={logout}>
                Log Out
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;