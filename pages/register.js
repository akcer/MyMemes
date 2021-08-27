import React, { useState } from 'react';
import Error from '../components/Error';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const handleImageFileChange = (event) => {
    // Show thumbnail https://gist.github.com/hartzis/0b77920380736f98e4f9
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setAvatarFile(file);
      setAvatarPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null);
      setAvatarPreviewUrl('');
    }
  };

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('email', email);
    formData.append('avatarFile', avatarFile);

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users/register`, formData)
      .then((response) => {
        router.push('/login');
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  return (
    <div>
      <h3 className="text-center text-xl font-bold mb-4">Register</h3>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="username">Username:</label>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label htmlFor="email">Email:</label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <label htmlFor="avatarFile">Avatar:</label>
          <input
            className="text-white"
            type="file"
            name="avatarFile"
            id="avatarFile"
            accept="image/*"
            onChange={handleImageFileChange}
          />
          <img className="max-w-xs mt-4" src={avatarPreviewUrl} />
        </div>
        {isError && <Error error={error} />}
        <button className="btn-dark-gray">Register</button>
      </form>
    </div>
  );
};

export default Register;
