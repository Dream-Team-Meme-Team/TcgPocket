import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../components/Pages/Home/HomePage';
import { routes } from '.';
import { ErrorPage } from '../components/Pages/Error/ErrorPage';
import { NotFoundPage } from '../components/Pages/NotFound/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={<HomePage />}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
