import { Fragment } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Dashboard;
