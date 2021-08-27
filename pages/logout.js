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
      <h3 className="text-center text-xl font-bold mb-4">Logout</h3>
      {isError && <Error error={error} />}
      <button
        className="block mx-auto btn-dark-gray"
        type="button"
        onClick={handleClick}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
