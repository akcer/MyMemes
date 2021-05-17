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
    <div className="comments">
      {!showComments && (
        <button
          className="show"
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
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <div className="comment__header">
                  <div className="avatar">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/avatars/${comment.author.avatar}`}
                      alt={comment.author.username}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="comment__info">
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
                <div className="comment__body">{comment.text}</div>
                {
                  //show delete button if user is admin or comment author
                  (user.role === 'admin' ||
                    user.username === comment.author.username) && (
                    <button
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
            onSubmit={(event) => {
              handleSubmit(event, memeId);
            }}
          >
            <label htmlFor="comment">Add Comment:</label>
            <textarea
              name="comment"
              id="comment"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              placeholder="Your Comment:"
            />
            {isError && <Error error={error} />}
            <button>Add Comment</button>
          </form>
        </div>
      )}
      <style jsx>{`
        .comments {
          width: 100%;
          font-size: 1rem;
        }
        .show {
          margin: 1rem auto;
          display: block;
        }
        ul {
          list-style-type: none;
          margin-top: 0;
          padding-left: 0;
        }
        li {
          display: block;
          border-top: 1px solid var(--main-color);
          border-bottom: 1px solid var(--main-color);
          padding: 1rem;
          padding-left: 0;
        }
        .avatar {
          width: 3rem;
          margin-right: 1rem;
        }
        .comment__info {
          display: inline-block;
        }
        .comment__header {
          display: flex;
          align-items: flex-start;
        }
        .comment__body {
          margin: 1rem 0;
        }
        p {
          margin: 0;
          font-size: 0.9rem;
        }
        textarea {
          border-radius: 5px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        form button {
          margin: 1rem auto;
        }
      `}</style>
    </div>
  );
};

Comments.propTypes = {
  memeId: PropTypes.string.isRequired,
};
export default Comments;
