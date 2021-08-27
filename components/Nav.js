import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserContext from '../contexts/userContext';
import PropTypes from 'prop-types';

const Nav = ({ showMenu }) => {
  const user = useContext(UserContext);
  return (
    <nav className="w-full">
      {showMenu ? (
        <ul className="flex flex-col items-center sm:flex-row sm:justify-between">
          <li>
            <Link
              href={{
                pathname: '/',
                query: { sort: 'newest' },
              }}
            >
              <a>Newest</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: '/',
                query: { sort: 'oldest' },
              }}
            >
              <a>Oldest</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: '/',
                query: { sort: 'top' },
              }}
            >
              <a>Top</a>
            </Link>
          </li>
          <li>
            <Link href="/random">
              <a>Random</a>
            </Link>
          </li>
          {
            //if user not logged
            !user.username ? (
              <>
                <li>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </li>
              </>
            ) : (
              //if user logged in
              <>
                <li>
                  <Link href="/addNewMeme">
                    <a>Add</a>
                  </Link>
                </li>
                <li>
                  <Link href="/logout">
                    <a>Logout</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/user/${user.username}`}>
                    <a>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/avatars/${user.avatar}`}
                        alt={`${user.username} avatar`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </a>
                  </Link>
                </li>
              </>
            )
          }
          {
            //if user logged in as admin
            user.role === 'admin' && (
              <li>
                <Link href="/admin">
                  <a>Admin</a>
                </Link>
              </li>
            )
          }
        </ul>
      ) : null}
    </nav>
  );
};
Nav.propTypes = {
  showMenu: PropTypes.bool.isRequired,
};
export default Nav;
