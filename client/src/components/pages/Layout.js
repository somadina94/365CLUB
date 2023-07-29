import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../main/Header';
import Footer from '../main/Footer';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
