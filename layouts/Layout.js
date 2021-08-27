import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Head />
    <Header />
    <main className="w-full max-w-2xl mx-auto p-4 pt-10 bg-gray-700">{children}</main>
    <Footer />
  </div>
);
Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Layout;
