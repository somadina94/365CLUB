import { Fragment } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import Layout from './components/pages/Layout';
import Dice from './components/body/Dice';
import Create from './components/auth/Create';
import Terms from './components/body/Terms';
import Rules from './components/body/Rules';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Details from './components/dashboard/Details';
import History from './components/history/History';
import Password from './components/dashboard/Password';
import Verify from './components/dashboard/Verify';
import Withdrawal from './components/dashboard/Withdrawal';
import Club365 from './components/dashboard/Club365';
import AddFunds from './components/dashboard/AddFunds';
import EmailVerify from './components/auth/EmailVerify';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Privacy from './components/body/Privacy';
import ContactUs from './components/body/ContactUs';
import ProtectedRoute from './components/protection/ProtectedRoute';
import Home from './components/body/Home';
import ErrorModal from './components/UI/ErrorModal';
import Numbers from './components/body/Numbers';

import { loader as historyLoader } from './components/history/History';
import { loader as emailLoader } from './components/auth/EmailVerify';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorModal />}>
      <Route index element={<Home />} />
      <Route
        path="play"
        element={
          <ProtectedRoute>
            <Dice />
          </ProtectedRoute>
        }
      />
      <Route path="play-numbers" element={<Numbers />} />
      <Route path="signUp" element={<Create />} />
      <Route path="terms" element={<Terms />} />
      <Route path="rules" element={<Rules />} />
      <Route path="login" element={<Login />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="privacy-policy" element={<Privacy />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="resetPassword/:token" element={<ResetPassword />} />
      <Route
        path="verify-email/:token"
        element={<EmailVerify />}
        loader={emailLoader}
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Details />} />
        <Route path="details" element={<Details />} />
        <Route path="history" element={<History />} loader={historyLoader} />
        <Route path="updatePassword" element={<Password />} />
        <Route path="verify-account" element={<Verify />} />
        <Route path="withdraw" element={<Withdrawal />} />
        <Route path="club365" element={<Club365 />} />
        <Route path="fund-account" element={<AddFunds />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <TawkMessengerReact
        propertyId="643012464247f20fefea5d26"
        widgetId="1gtdseqgd"
      />
    </Fragment>
  );
}

export default App;
