import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../components/Pages/Home/HomePage';
import { ErrorPage } from '../components/Pages/Error/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    /** add more pages here! */

    /** error + not found */
    errorElement: <ErrorPage />,
  },
]);
