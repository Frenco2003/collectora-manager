// App.tsx
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout, type PageId } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Catalog } from './pages/Catalog';
import { Login } from './pages/Login';
import store, { type RootState } from './redux/store';
import { Collections } from './pages/Collections';

function AppContent() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <Catalog />;
         case 'collections':
        return <Collections />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* qualsiasi path → AppContent gestisce login/layout */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
