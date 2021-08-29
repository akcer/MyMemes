import React, { useState, useContext } from 'react';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import Error from './Error';
import UserContext from '../contexts/userContext';
import PropTypes from 'prop-types';

const Comments = ({ memeId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const user = useContext(UserContext);
  //Get comments
  const getComments = (memeId) => {
    setShowComments(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/comments/${memeId}`)
      .then((response) => {
        setComments(response.data);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  //Add comment
  const handleSubmit = (event, memeId) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/comments/add`,
        {
          text: commentText,
          meme: memeId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setCommentText('');
        getComments(memeId);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };
  //Remove comment
  const deleteComment = (commentId) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_HOST}/comments/${commentId}`, {
        withCredentials: true,
      })
      .then((response) => {
        getComments(memeId);
        setIsError(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  return (
    <div className="comments w-full">
      {!showComments && (
        <button
          className="btn-light-gray block mx-auto my-4"
          onClick={() => {
            getComments(memeId);
          }}
        >
          showComments
        </button>
      )}
      {showComments && (
        <div>
          {!comments.length && 'No comments yet'}
          <ul className="divide-y divide-gray-500">
            {comments.map((comment) => (
              <li className="block py-4 pl-0 pr-4" key={comment._id}>
                <div className="flex items-start">
                  <div className="mr-4 w-12">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/avatars/${comment.author.avatar}`}
                      alt={comment.author.username}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="inline-block text-sm">
                    <p>
                      <Link
                        href={{
                          pathname: '/user',
                          query: { user: comment.author.username },
                        }}
                        as={`/user/${comment.author.username}`}
                      >
                        <a>{comment.author.username}</a>
                      </Link>
                    </p>
                    <p>
                      {formatDistanceToNow(parseISO(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="my-4">{comment.text}</div>
                {
                  //show delete button if user is admin or comment author
                  (user.role === 'admin' ||
                    user.username === comment.author.username) && (
                    <button
                      className="btn-light-gray"
                      type="button"
                      onClick={() => {
                        deleteComment(comment._id);
                      }}
                    >
                      Delete Comment
                    </button>
                  )
                }
              </li>
            ))}
          </ul>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              handleSubmit(event, memeId);
            }}
          >
            <label htmlFor="comment">Add Comment:</label>
            <textarea
              className="rounded text-black p-1"
              name="comment"
              id="comment"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              placeholder="Your Comment:"
            />
            {isError && <Error error={error} />}
            <button className="btn-light-gray mx-auto my-4">Add Comment</button>
          </form>
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  memeId: PropTypes.string.isRequired,
};
export default Comments;
