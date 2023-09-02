import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../components/Pages/home/HomePage';
import { ErrorPage } from '../components/Pages/error/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    /** add more pages here! */

    /** error + not found */
    errorElement: <ErrorPage />,
  },
]);
