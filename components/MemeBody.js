import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

const MemeBody = ({ topTitle, image, text, bottomTitle }) => {
  return (
    <div className="bg-gray-800 mx-auto w-11/12 overflow-auto">
      <h2 className="text-center text-2xl my-6 font-bold">{topTitle}</h2>
      <div className="mx-auto w-11/12">
        <Image
          src={`${image}`}
          alt={`${topTitle} ${bottomTitle}`}
          width={1000}
          height={1000}
          objectFit="contain"
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
