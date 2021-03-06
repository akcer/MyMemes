import React, { useState } from 'react';
import MemeBody from '../components/MemeBody';
import Error from '../components/Error';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddNewMeme = () => {
  const [topTitle, setTopTitle] = useState('');
  const [bottomTitle, setBottomTitle] = useState('');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const handleImageFileChange = (event) => {
    // Show thumbnail https://gist.github.com/hartzis/0b77920380736f98e4f9
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImageFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreviewUrl('');
    }
  };

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('topTitle', topTitle);
    formData.append('bottomTitle', bottomTitle);
    formData.append('text', text);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/add`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        router.push(`/meme/${response.data.response._id}`);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  };

  return (
    <>
      <h3 className="text-center text-xl font-bold mb-4">Add new Meme</h3>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="topTitle">Top Title:</label>
        <input
          className="input"
          type="text"
          name="topTitle"
          id="topTitle"
          onChange={(e) => setTopTitle(e.target.value)}
          value={topTitle}
        />
        <label htmlFor="imageFile">Image from disc:</label>
        <input
          className="text-white mb-4"
          type="file"
          name="imageFile"
          id="imageFile"
          accept="image/*"
          onChange={handleImageFileChange}
        />
        <label htmlFor="bottomTitle">Bottom Title:</label>
        <input
          className="input"
          type="text"
          name="bottomTitle"
          id="bottomTitle"
          onChange={(e) => setBottomTitle(e.target.value)}
          value={bottomTitle}
        />
        <label htmlFor="text">Text:</label>
        <input
          className="input"
          type="text"
          name="text"
          id="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {isError && <Error error={error} />}
        <button className="mb-4 btn-dark-gray">Add New Meme</button>
      </form>
      <MemeBody
        topTitle={topTitle}
        image={imagePreviewUrl || '/default-image.png'}
        bottomTitle={bottomTitle}
        text={text}
      />
    </>
  );
};

export default AddNewMeme;
