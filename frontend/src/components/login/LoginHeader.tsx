import { Package } from 'lucide-react';

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/50">
        <Package className="text-white" size={32} />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
        Collectora
      </h1>
      <p className="text-gray-400">Gestisci le tue collezioni</p>
    </div>
  );
}
