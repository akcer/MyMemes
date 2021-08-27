import React from 'react';
import Link from 'next/link';
import MemeBody from '../components/MemeBody';
import MemeFooter from '../components/MemeFooter';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Gallery = ({
  memes,
  itemsPerPage,
  memesCount,
  handleItemsPerPageChange,
  handlePaginationChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      {memes.map((meme) => (
        <div className="divide-y-2 divide-gray-700 mb-4" key={meme._id}>
          <Link href={`/meme/${meme._id}`}>
            <a className="block">
              <MemeBody
                topTitle={meme.topTitle}
                image={`${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/${meme.image}`}
                bottomTitle={meme.bottomTitle}
                text={meme.text}
              />
            </a>
          </Link>
          <MemeFooter
            createdAt={meme.createdAt}
            likes={meme.likes.likesCount}
            dislikes={meme.dislikes.dislikesCount}
            comments={meme.comments}
            id={meme._id}
            author={meme.author.username}
          />
        </div>
      ))}

      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(memesCount / itemsPerPage)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePaginationChange}
        containerClassName={'pagination'}
        activeClassName={'act'}
        previousClassName={'prev'}
        nextClassName={'next'}
      />
      <div className="limit mt-4">
        <span className="mr-4">Memes per page:</span>
        <select
          className="text-black rounded"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};
Gallery.propTypes = {
  memes: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  memesCount: PropTypes.number.isRequired,
  handleItemsPerPageChange: PropTypes.func.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
};
export default Gallery;
