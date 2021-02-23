import React, { useState } from 'react';
import AuthModel from '../models/AuthModel';
import UserModel from '../models/UserModel';

import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);

  const handleSubmit = e => {
    e.preventDefault();
    AuthModel.login({ email, password }).then(response => {
      localStorage.setItem('uid', response.token);

      UserModel.show().then(response => {
        setUser(response.user);
        
        props.history.push('/courses');
      });
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default Login;