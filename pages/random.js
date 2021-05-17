import React from 'react';
import axios from 'axios';
import MemeBody from '../components/MemeBody';
import MemeFooter from '../components/MemeFooter';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Random = ({ randomMeme }) => {
  const {
    topTitle,
    image,
    bottomTitle,
    text,
    createdAt,
    likes,
    dislikes,
    comments,
    _id,
    author,
  } = randomMeme;

  const router = useRouter();

  const getRandomMeme = () => {
    router.push('/random');
  };
  return (
    <div>
      <MemeBody
        topTitle={topTitle}
        image={`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/${image}`}
        bottomTitle={bottomTitle}
        text={text}
      />
      <MemeFooter
        createdAt={createdAt}
        likes={likes.likesCount}
        dislikes={dislikes.dislikesCount}
        comments={comments}
        id={_id}
        author={author}
      />
      <button type="button" onClick={getRandomMeme}>
        Get Random meme
      </button>
      <style jsx>{`
        button {
          display: block;
          margin: 1rem auto 0;
        }
      `}</style>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/random`)
    .catch((error) => {
      console.log(error);
    });
  const randomMeme = response?.data;
  if (!randomMeme) {
    return {
      notFound: true,
    };
  }
  return {
    props: { randomMeme },
  };
}
Random.propTypes = {
  randomMeme: PropTypes.object.isRequired,
};

export default Random;
