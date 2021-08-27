import '../styles/globals.css'
import Layout from '../layouts/Layout';
import React, { useState, useEffect } from 'react';
import UserContext from '../contexts/userContext';
import axios from 'axios';
import PropTypes from 'prop-types';

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState({ username: null, avatar: null, role: null });
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users/authenticate`, {
        withCredentials: true,
      })
      .then((response) => {
        changeUser(
          response.data.username,
          response.data.avatar,
          response.data.role
        );
      })
      .catch((error) => {
        changeUser(null, null, null);
      });
  }, [user.username, user.avatar, user.role]);

  const changeUser = (username, avatar, role) => {
    setUser({
      username: username,
      avatar: avatar,
      role: role,
    });
  };
  return (
    <UserContext.Provider value={{ changeUser, ...user }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
};

MyApp.propTypes={
  Component:PropTypes.func.isRequired,
  pageProps:PropTypes.object.isRequired,
}
export default MyApp;
