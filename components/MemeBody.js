import Image from 'next/image';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MemeBody = ({ topTitle, image, text, bottomTitle }) => {
  const [imageSrc, setImageSrc] = useState(image)
  const handleImageError = () => {
    setImageSrc('/default-image.png')
  };
  return (
    <div className="bg-gray-800 mx-auto w-11/12 overflow-auto">
      <h2 className="text-center text-2xl my-6 font-bold">{topTitle}</h2>
      <div className="mx-auto w-11/12">
        <Image
          src={`${imageSrc}`}
          alt={`${topTitle} ${bottomTitle}`}
          width={1000}
          height={1000}
          objectFit="contain"
          onError={handleImageError}
        />
      </div>
      <h2 className="text-center text-2xl my-6 font-bold">{bottomTitle}</h2>
      <p className="text-center text-xl pb-4">{text}</p>
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
