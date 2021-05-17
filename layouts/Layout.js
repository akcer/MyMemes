import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Head />
    <Header />
    <main>{children}</main>
    <Footer />
    <style jsx global>{`
      :root {
        --bg-color: #2b2a2a;
        --main-color: #333232;
        --font-color: #ffffff;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
      }
      body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        background-color: var(--bg-color);
        color: var(--font-color);
        font: 1rem Arial, sans-serif;
      }

      a {
        color: var(--font-color);
        text-decoration: none;
      }
      button {
        outline: none;
        cursor: pointer;
        background-color: transparent;
        color: var(--font-color);
        //border:3px solid var(--main-color);
        border: 3px ridge;
        border-radius: 5px;
      }
      button:active{
        border: 3px groove;
      }
      button:hover{
        //border: 3px groove;
        transform:scale(1.1)

      }
    `}</style>
    <style jsx>
      {`
        main {
          background-color: var(--main-color);
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
      `}
    </style>
  </>
);
Layout.propTypes={
  children:PropTypes.object.isRequired,
}
export default Layout;
