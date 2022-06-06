import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
import { Route , Routes } from 'react-router-dom';
import Main from '../main/main';
import Header from '../header/header';
import PageNotFound from '../page-not-found/page-not-found';
import { AppRoute,  AuthorizationStatus,  isCheckedAuth } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { Navigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getDataLoaded } from '../../store/offers/selectors';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path={AppRoute.Login}
          element={authorizationStatus === AuthorizationStatus.Auth ? <Navigate to={AppRoute.Main} /> : <Login />}
        />
        <Route
          path={AppRoute.Property}
          element={<Property />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
