import { useState} from 'react';
import { useSelector, Provider } from 'react-redux';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import store, { type RootState } from './redux/store';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function AppContent() {
  const { user, loading } = useSelector((state: RootState) => state.auth); // Ottieni lo stato dell'autenticazione da Redux
  const [currentPage, setCurrentPage] = useState('dashboard'); // Stato della pagina corrente

  // Se l'autenticazione è in corso, mostriamo un caricamento
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

  // Se l'utente non è autenticato, reindirizziamo alla pagina di login
  if (!user) {
    return <Login />; 
  }

  // Funzione per il rendering dinamico delle pagine
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      // Puoi aggiungere altre pagine qui come 'catalog', 'compare', ecc.
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()} {/* Renderizza la pagina corrente */}
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Le rotte per login e dashboard */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />  {/* Reindirizza la home alla login */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AppContent />} /> {/* Usa AppContent per la dashboard */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
