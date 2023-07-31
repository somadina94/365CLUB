import { Fragment } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="" />
        <link rel="canonical" href="/dashboard" />
      </Helmet>
      <Header />
      <main className="out-let-dash">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Dashboard;
