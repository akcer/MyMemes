import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  if (!error) {
    return null;
  } else {
    //https://github.com/axios/axios#handling-errors
    return (
      <div className="text-black bg-red-600">
        <h3 className="text-center text-2xl">Something Goes Wrong!!! </h3>
        {error.response ? (
          <p className="text-center">{error.response.data.message}</p>
        ) : error.request ? (
          <p className="text-center">
            'Network Error! The request was made but no response was received.'
          </p>
        ) : (
          <p className="text-center">{error.message}</p>
        )}
      </div>
    );
  }
};
Error.propTypes = {
  error: PropTypes.object,
};
export default Error;
