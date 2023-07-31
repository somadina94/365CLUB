import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { getMe } from '../../api/api';
import { useEffect, useState } from 'react';
import { authActions } from '../../store/auth-slice';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState('pending');
  const { jwt } = useCookies(['jwt'])[0];
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const res = await getMe(jwt);
      if (res.status === 'success') {
        dispatch(authActions.refreshUser({ user: res.data.user }));
        setAuth('authenticated');
      } else {
        setAuth('unauthenticated');
        dispatch(authActions.logout());
      }
    };
    fetch();
  }, [jwt, dispatch]);

  return auth === 'authenticated' ? (
    children
  ) : auth === 'unauthenticated' ? (
    <Navigate to="/login" />
  ) : (
    <div className="container">
      <Skeleton
        style={{
          height: '6rem',
          display: 'block',
          margin: 'auto',
          marginBottom: '4rem',
          width: '100%',
        }}
        variant="rectangular"
      />
      <Skeleton
        style={{
          maxWidth: '80rem',
          height: '60rem',
          display: 'block',
          margin: 'auto',
        }}
        variant="rectangular"
      />
    </div>
  );
};

export default ProtectedRoute;
