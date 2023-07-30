import { Fragment } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <main className="out-let-dash">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Dashboard;
