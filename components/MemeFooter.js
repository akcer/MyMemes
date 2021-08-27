import React, { useState, useContext } from 'react';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Comments from './Comments';
import Likes from './Likes';
import Error from './Error';
import UserContext from '../contexts/userContext';
import PropTypes from 'prop-types';

const MemeFooter = ({ id, author, createdAt, likes, dislikes }) => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const deleteMeme = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsError(false);
        router.push('/');
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  return (
    <div className="flex flex-col items-center w-11/12 p-4 mx-auto bg-gray-800">
      <div className="text-sm">
        Author:&nbsp;
        <Link
          href={{ pathname: '/user', query: { user: author } }}
          as={`/user/${author}`}
        >
          <a className="font-bold">{author}</a>
        </Link>
        {'   '}
        Created:&nbsp;
        <span className="font-bold">
          {formatDistanceToNow(parseISO(createdAt), { addSuffix: true })}
        </span>
      </div>
      <Likes likes={likes} dislikes={dislikes} id={id} />
      <Comments memeId={id} />
      {isError && <Error error={error} />}
      {
        //show delete button if user is admin or meme author
        (user.role === 'admin' || user.username === author) && (
          <button
            className="btn-light-gray"
            type="button"
            onClick={() => {
              deleteMeme(id);
            }}
          >
            Delete Meme
          </button>
        )
      }
    </div>
  );
};
MemeFooter.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
};

export default MemeFooter;
