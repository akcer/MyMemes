import NextHead from 'next/head';
import { string } from 'prop-types';
import React from 'react';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = ({ title, url, description, ogImage }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>Mymemes</title>
    <meta
      name="description"
      content={description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/touch-icon.png" />
    <link rel="apple-touch-icon" href="/touch-icon.png" />
    <link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title || ''} />
    <meta
      property="og:description"
      content={description || defaultDescription}
    />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
