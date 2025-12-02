// src/components/catalog/AddCollectionModal.tsx
import { useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import { supabase } from '../../lib/subabase';


interface AddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddCollectionModal({ isOpen, onClose, onSuccess }: AddCollectionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'pokemon',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('Devi essere autenticato');
      if (!formData.name.trim()) throw new Error('Il nome è obbligatorio');

      const { error: insertError } = await supabase.from('collections').insert({
        user_id: user.email,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim() || null,
      });

      if (insertError) throw insertError;

      setFormData({ name: '', category: 'pokemon', description: '' });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Errore durante la creazione della collezione');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Nuova Collezione</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome Collezione *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Es: Carte Pokémon Rare"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="pokemon">Pokémon Cards</option>
                <option value="magic">Magic: The Gathering</option>
                <option value="yugioh">Yu-Gi-Oh!</option>
                <option value="action_figures">Action Figures</option>
                <option value="coins">Monete</option>
                <option value="stamps">Francobolli</option>
                <option value="comics">Fumetti</option>
                <option value="sports_cards">Carte Sportive</option>
                <option value="other">Altro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrizione
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Descrizione della collezione..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creazione...' : 'Crea Collezione'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
