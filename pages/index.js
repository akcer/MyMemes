import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Gallery from '../components/Gallery';
import PropTypes from 'prop-types';

const Home = ({ memes, memesCount }) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: '/',
      query: {
        limit: itemsPerPage,
        skip: page * itemsPerPage,
        sort: router.query.sort,
      },
    });
  }, [page, itemsPerPage]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };
  const handlePaginationChange = (data) => {
    setPage(data.selected);
  };

  return (
    <div>
      <Gallery
        memes={memes}
        itemsPerPage={itemsPerPage}
        memesCount={memesCount}
        handleItemsPerPageChange={handleItemsPerPageChange}
        handlePaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const result = await axios
    .get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/memes?limit=${
        ctx.query.limit || 5
      }&skip=${ctx.query.skip || 0}&sort=${ctx.query.sort || 'newest'}`
    )
    .catch((error) => {
      console.log(error);
    });
  const memesCount = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/count`)
    .catch((error) => {
      console.log(error);
    });
  if (!result.data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { memes: result.data, memesCount: memesCount.data },
  };
}
Home.propTypes = {
  memes: PropTypes.array.isRequired,
  memesCount: PropTypes.number.isRequired,
};
export default Home;
