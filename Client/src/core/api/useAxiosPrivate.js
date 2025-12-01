import { useEffect, useRef } from 'react';
import axiosPrivate from './axiosPrivate';
import { setupRequestInterceptor } from './interceptors/request';
import { setupResponseInterceptor } from './interceptors/response';
import { useAuth } from '../../features/auth/context/authProvider';

const useAxiosPrivate = () => {
  const { auth, refresh, logout } = useAuth();
  const interceptorsRef = useRef({ request: null, response: null });

  useEffect(() => {
    const getAccessToken = () => auth?.accessToken;

    // Configurar interceptores
    const requestIntercept = setupRequestInterceptor(axiosPrivate, getAccessToken);
    const responseIntercept = setupResponseInterceptor(axiosPrivate, refresh, logout);

    interceptorsRef.current = {
      request: requestIntercept,
      response: responseIntercept
    };

    // limpiar
    return () => {
      if (interceptorsRef.current.request !== null) {
        axiosPrivate.interceptors.request.eject(interceptorsRef.current.request);
      }
      if (interceptorsRef.current.response !== null) {
        axiosPrivate.interceptors.response.eject(interceptorsRef.current.response);
      }
    };
  }, [auth, refresh, logout]);

  return axiosPrivate;
};

export default useAxiosPrivate;