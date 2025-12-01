import { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hook/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children }: LayoutProps) {
  const { handleLogout } = useAuth(); // Usa il nostro hook personalizzato
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/95 backdrop-blur-sm border-r border-gray-700 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Contenuto della Sidebar */}
      </div>

      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Esci</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
