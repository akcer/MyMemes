import React, { useState } from 'react';
import axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

const Likes = ({ likes, dislikes, id }) => {
  const [votes, setVotes] = useState({ likes, dislikes });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const like = (id) => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setVotes(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  const dislike = (id) => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/dislike/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setVotes(response.data);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  return (
    <div>
      {isError && <Error error={error} />}
      <div className="likes">
        {votes.likes}
        <button
          onClick={() => {
            like(id);
          }}
        >
          &#x1F44D;
        </button>
        {votes.dislikes}
        <button
          onClick={() => {
            dislike(id);
          }}
        >
          &#x1F44E;
        </button>
      </div>
      <style jsx>
        {`
          .likes {
            display: flex;
            justify-content: center;
            align-items: baseline;
            font-size: 1.1rem;
          }
          button {
            background-color: transparent;
            border: none;
            font-size: 1.5rem;
          }
          button:active {
            transform: scale(1.5);
          }
        `}
      </style>
    </div>
  );
};
Likes.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
export default Likes;
