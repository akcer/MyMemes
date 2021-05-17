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
    <div className="bottomBar">
      <div>
        Author:&nbsp;
        <Link
          href={{ pathname: '/user', query: { user: author } }}
          as={`/user/${author}`}
        >
          <a>{author}</a>
        </Link>
        {'   '}
        Created:&nbsp;
        <span>
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
            type="button"
            onClick={() => {
              deleteMeme(id);
            }}
          >
            Delete Meme
          </button>
        )
      }
      <style jsx>
        {`
          .bottomBar {
            background-color: #2a2a2a;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding:1rem;
            font-size 14px;
            border-top:5px solid var(--main-color)

          }
          a, span {
            font-weight: bold;
          }
          button{
            
          }
        `}
      </style>
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
