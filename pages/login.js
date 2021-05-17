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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          {isError && <Error error={error} />}
          <button>Login</button>
        </form>
      </div>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        button{
          margin-top:1rem
        }
      `}</style>
    </div>
  );
};

export default Login;
