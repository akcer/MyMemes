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
    <div className="gallery">
      {memes.map((meme) => (
        <div className="meme" key={meme._id}>
          <Link href={`/meme/${meme._id}`}>
            <a>
              <MemeBody
                topTitle={meme.topTitle}
                image={
                  `${process.env.NEXT_PUBLIC_SERVER_HOST}/memes/${meme.image}` 
                }
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
        activeClassName={'active'}
        previousClassName={'prev'}
        nextClassName={'next'}
      />
      <div className="limit">
        <span>Memes per page:</span>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <style jsx>
        {`
          .gallery {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .meme {
            margin-bottom: 1rem;
            width: 100%;
          }
          a {
            text-decoration: none;
            display: block;
          }
          :global(.pagination) {
            display: flex;
            list-style-type: none;
            padding-inline-start: 0;
            width: clamp(200px, 50%, 500px);
            justify-content: space-between;
            cursor: pointer;
          }
          :global(.active) {
            transform: scale(1.5);
          }
          :global(.active :focus, .prev :focus, .next :focus) {
            outline: 0;
          }
        `}
      </style>
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
