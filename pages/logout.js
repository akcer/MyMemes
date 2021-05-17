import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import UserContext from '../contexts/userContext';

const Logout = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const handleClick = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        user.changeUser(null, null, null);
        router.push('/');
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  return (
    <div>
      <h3>Logout</h3>
      {isError && <Error error={error} />}
      <button type="button" onClick={handleClick}>
        Logout
      </button>
      <style jsx>{`
        h3 {
          text-align: center;
          margin-top: 0;
        }
        button {
          display: block;
          max-width: 200px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default Logout;
