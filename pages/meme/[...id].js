import React from 'react';
import axios from 'axios';
import MemeBody from '../../components/MemeBody';
import MemeFooter from '../../components/MemeFooter';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Meme = ({ meme }) => {
  const router = useRouter();
  /* If the page is not yet generated, this will be displayed
     initially until getStaticProps() finishes running*/
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="divide-y-2 divide-gray-700">
      <MemeBody
        topTitle={meme.topTitle}
        image={`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/${meme.image}`}
        bottomTitle={meme.bottomTitle}
        text={meme.text}
      />
      <MemeFooter
        createdAt={meme.createdAt}
        likes={meme.likes.likesCount}
        dislikes={meme.dislikes.dislikesCount}
        comments={meme.comments}
        id={meme._id}
        author={meme.author.username}
      />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes`)
    .catch((error) => {
      console.log(error);
    });
  const resp = response.data;
  const paths = resp.map((meme) => `/meme/${meme._id}`);
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/meme/${params.id}`
  );
  const meme = response.data;
  if (!meme._id) {
    return {
      notFound: true,
    };
  }
  return { props: { meme }, revalidate: 1 };
}

Meme.propTypes = {
  meme: PropTypes.object.isRequired,
};
export default Meme;
