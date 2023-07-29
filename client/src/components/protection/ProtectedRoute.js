import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

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
      console.log(res);
      if (res.status === 'success') {
        setAuth('authenticated');
      } else {
        dispatch(authActions.logout());
        setAuth('unauthenticated');
      }
    };
    fetch();
  }, [jwt, dispatch]);

  return auth === 'authenticated' ? (
    children
  ) : auth === 'unauthenticated' ? (
    <Navigate to="/login" />
  ) : null;
};

export default ProtectedRoute;
