import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../components/Pages/Home/HomePage';
import { ErrorPage } from '../components/Pages/Error/ErrorPage';
import { InventoryPage } from '../components/Pages/Inventory/InventoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/inventory',
    element: <InventoryPage />,
  },
  {
    errorElement: <ErrorPage />,
  },
]);
