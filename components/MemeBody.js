import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

const MemeBody = ({ topTitle, image, text, bottomTitle }) => {
  const handleImageError = (event) => {
    event.target.src = '/default-image.png';
  };
  return (
    <div>
      <h2>{topTitle}</h2>
      <div className="meme__image">
        <Image
          src={`${image}`}
          alt={`${topTitle} ${bottomTitle}`}
          width={1000}
          height={1000}
          objectFit="contain"
          onError={handleImageError}
        />
      </div>
      <h2>{bottomTitle}</h2>
      <p>{text}</p>
      <style jsx>
        {`
          div {
            background-color: var(--bg-color);
            overflow:auto;
          }
          .meme__image {
            margin: 0 auto;
            width: 90%;
          }

          h2 {
            text-align: center;
            //margin-top:0;
            //padding-top:1rem
          }
          p {
            text-align: center;
            padding-bottom: 1rem;
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};
MemeBody.propTypes = {
  topTitle: PropTypes.string,
  image: PropTypes.string,
  bottomTitle: PropTypes.string,
  text: PropTypes.string,
};
export default MemeBody;
