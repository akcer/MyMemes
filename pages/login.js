import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Error from '../components/Error';
import UserContext from '../contexts/userContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const user = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/users/login/local`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        user.changeUser(
          response.data.username,
          response.data.avatar,
          response.data.role
        );
        router.push(`/user/${response.data.username}`);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  return (
    <div>
      <h3 className="text-center text-xl font-bold mb-4">Login</h3>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <label htmlFor="username">Username:</label>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        {isError && <Error error={error} />}
        <button className="btn-dark-gray">Login</button>
      </form>
    </div>
  );
};

export default Login;
