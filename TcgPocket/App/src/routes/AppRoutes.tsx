import { Route, Routes } from 'react-router-dom';
import { routes } from './Index';
import { ErrorPage } from '../pages/error/ErrorPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { HomePage } from '../pages/home/HomePage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { useAppSelector } from '../store/configureStore';
import { AdminPage } from '../pages/admin/AdminPage';
import { useMemo } from 'react';
import { InventoryPage } from '../pages/inventory/InventoryPage';

export function AppRoutes() {
    const user = useAppSelector((state) => state.user.user);

    const isAdmin: boolean | undefined = useMemo(() => {
        if (!user) {
            return false;
        }
        const isAdmin: number = user?.roles.findIndex(
            (r: { name: string }) => r.name === 'Admin'
        );
        return isAdmin !== -1;
    }, [user]);

    return (
        <Routes>
            <Route
                path={routes.home}
                element={<HomePage />}
                errorElement={<ErrorPage />}
            />
            {user && (
                <Route
                    path={routes.inventory}
                    element={<InventoryPage />}
                    errorElement={<ErrorPage />}
                />
            )}
            {user && (
                <Route
                    path={routes.settings}
                    element={<SettingsPage />}
                    errorElement={<ErrorPage />}
                />
            )}
            {isAdmin && (
                <Route
                    path={routes.adminPortal}
                    element={<AdminPage />}
                    errorElement={<ErrorPage />}
                />
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
