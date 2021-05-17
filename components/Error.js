import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  if (!error) {
    return null;
  } else {
    //https://github.com/axios/axios#handling-errors
    return (
      <div>
        <h3>Something Goes Wrong!!! </h3>
        {error.response ? (
          <p>{error.response.data.message}</p>
        ) : error.request ? (
          <p>
            'Network Error! The request was made but no response was received.'
          </p>
        ) : (
          <p>{error.message}</p>
        )}

        <style jsx>{`
          h3,
          p {
            text-align: center;
          }
          div {
            background-color: red;
          }
        `}</style>
      </div>
    );
  }
};
Error.propTypes = {
  error: PropTypes.object,
};
export default Error;
