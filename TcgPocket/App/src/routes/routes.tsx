import { Route, Routes } from 'react-router-dom';
import { routes } from '.';
import { ErrorPage } from '../pages/error/ErrorPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { HomePage } from '../pages/home/home-page';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { useAppSelector } from '../store/configureStore';
import { AdminPage } from '../pages/admin/AdminPage';
import { InventoryPage } from '../pages/inventory/InventoryPage';

export const AppRoutes = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <Routes>
            <Route
                path={routes.home}
                element={<HomePage />}
                errorElement={<ErrorPage />}
            />
            {user && (
                <>
                    <Route
                        path={routes.inventory}
                        element={<InventoryPage />}
                        errorElement={<ErrorPage />}
                    />
                    <Route
                        path={routes.settings}
                        element={<SettingsPage />}
                        errorElement={<ErrorPage />}
                    />
                </>
            )}
            {/* will need to be for ADMINS only */}
            {user && (
                <Route
                    path={routes.adminPortal}
                    element={<AdminPage />}
                    errorElement={<ErrorPage />}
                />
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
