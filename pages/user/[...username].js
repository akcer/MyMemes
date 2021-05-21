import React, { useState, useContext } from 'react';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UserContext from '../../contexts/userContext';
import Error from '../../components/Error';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const deleteUser = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users/${id}`, {
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
    <div className="user">
      <h2>{user?.username}</h2>
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/avatars/${user?.avatar}`}
        alt={user?.username}
        width={1000}
        height={1000}
      />
      <div className="created">
        Account created: {user?.createdAt/*format(parseISO(user?.createdAt), 'dd MMMM yyyy')*/}
      </div>
      {isError && <Error error={error} />}
      {
        //show delete button if user is admin or meme author
        (userCtx.role === 'admin' || userCtx.username === user?.username) && (
          <button
            type="button"
            onClick={() => {
              deleteUser(user?._id);
            }}
          >
            Delete User
          </button>
        )
      }
      <style jsx>{`
        h2 {
          margin-top: 0;
        }
        .user {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .created {
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users`)
    .catch((error) => {
      console.log(error);
    });
  const resp = response.data;
  const paths = resp.map(
    (user) => `/user/${encodeURIComponent(user?.username)}`
  );
  return { paths, fallback: true };
}
export async function getStaticProps({ params }) {
  const response = await axios
    .get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/users/user/${decodeURIComponent(
        params.username
      )}`
    )
    .catch((error) => {
      console.log(error);
    });
  const user = response.data;
  if (!user.username) {
    return {
      notFound: true,
    };
  }
  return {
    props: { user },
  };
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
