import { Route, Routes } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import SingUp from '../SingUp/SingUp';
import LogIn from '../LogIn/LogIn';
import PrivateRoute from './PrivatRoute';
import PublicRoute from './PublicRoute';
import { lazy } from 'react';

const Contacts = lazy(() => import('./ContactsContainer'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/register" element={<SingUp />} />
            <Route path="/login" element={<LogIn />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
