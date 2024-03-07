import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, RegistrationPage } from './pages';
import { deleteCookie, getCookies } from './utils';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='/*' element={<Navigate to='/auth' />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path='*' element={<Navigate to='/main' />} />
  </Routes>
);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authCookies = getCookies('doggee-auth-token');
    const isNotMyDevice = getCookies('doggee-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookies && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('doggee-isNotMyDevice');
      setIsAuth(true);
    }

    if (authCookies && !isNotMyDevice) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
}

export default App;
