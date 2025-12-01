import { Provider, useSelector } from 'react-redux';
import { Login } from './pages/Login';
import type { RootState } from './redux/store';
import store from './redux/store';

function AppContent() {
  const { user, loading } = useSelector((state: RootState) => state.auth); // Ottieni lo stato da Redux

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Caricamento...</p>
        </div>
      </div>
    );
  }

  // per ora, sempre e solo Login se non loggato
  if (!user) {
    return <Login />;
  }

  // quando avrai la dashboard vera, la metterai qui
  return <div className="text-white">Sei loggato, qui ci sarà la dashboard</div>;
}

function App() {
  return (
    <Provider store={store}> 
      <AppContent /> {/* Il contenuto della tua app */}
    </Provider>
  );
}

export default App;
