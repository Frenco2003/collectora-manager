import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hook/useAuth';
import { supabase } from '../../lib/subabase';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddItemModal({ open, onClose, onSuccess }: AddItemModalProps) {
  const { user } = useAuth();
  const [collections, setCollections] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    collection_id: '',
    name: '',
    category: 'pokemon',
    rarity: '',
    condition: 'mint',
    purchase_price: '',
    current_market_value: '',
    quantity: '1',
    notes: '',
    image_url: '',
  });

  // Carica le collezioni dell'utente
  const loadCollections = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('collections')
      .select('id, name')
      .eq('user_email', user.email)
      .order('name');

    if (error) {
      console.error('Errore nel recuperare le collezioni:', error);
      return;
    }

    setCollections(data || []);
    if (data?.length > 0) {
      setFormData((prev) => ({ ...prev, collection_id: data[0].id }));
    }
  };

  // Effetto per caricare le collezioni all'apertura della modale
  useEffect(() => {
    if (open && user) {
      loadCollections();
    }
  }, [open, user]);

  // Gestione dell'upload dell'immagine
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'immagine deve essere inferiore a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestione della submit del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.collection_id) {
        throw new Error('Seleziona una collezione');
      }

      if (!formData.name.trim()) {
        throw new Error('Il nome è obbligatorio');
      }

      if (!formData.current_market_value || Number(formData.current_market_value) < 0) {
        throw new Error('Inserisci un valore stimato valido');
      }

      const { error: insertError } = await supabase.from('items').insert({
        collection_id: formData.collection_id,
        name: formData.name.trim(),
        category: formData.category,
        rarity: formData.rarity.trim() || null,
        condition: formData.condition,
        purchase_price: formData.purchase_price ? Number(formData.purchase_price) : null,
        current_market_value: Number(formData.current_market_value),
        quantity: Number(formData.quantity),
        notes: formData.notes.trim() || null,
        image_url: formData.image_url || null,
      });

      if (insertError) throw insertError;

      setFormData({
        collection_id: collections[0]?.id || '',
        name: '',
        category: 'pokemon',
        rarity: '',
        condition: 'mint',
        purchase_price: '',
        current_market_value: '',
        quantity: '1',
        notes: '',
        image_url: '',
      });
      setImagePreview(null);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Errore durante l\'aggiunta dell\'oggetto');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Aggiungi Nuovo Oggetto</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Collezione *
            </label>
            <select
              value={formData.collection_id}
              onChange={(e) => setFormData({ ...formData, collection_id: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {collections.length === 0 ? (
                <option value="">Nessuna collezione disponibile</option>
              ) : (
                collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Other input fields go here... */}

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading || collections.length === 0}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Aggiunta in corso...' : 'Aggiungi Oggetto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
