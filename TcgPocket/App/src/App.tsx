import { PrimaryNavigation } from './components/Navigation/PrimaryNavigation';
import { AppRoutes } from './routes/routes';

function App() {
    return (
        <PrimaryNavigation>
            <AppRoutes />
        </PrimaryNavigation>
    );
}

export default App;
