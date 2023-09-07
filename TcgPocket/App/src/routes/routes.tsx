import { Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { ErrorPage } from '../pages/error/ErrorPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { HomePage } from '../pages/home/HomePage';

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
