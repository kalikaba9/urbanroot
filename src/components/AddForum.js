import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assure-toi que l'instance de Firestore est bien importée

const AddForum = () => {
  const [forumName, setForumName] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ajout du forum à Firestore
      await addDoc(collection(db, 'forums'), {
        name: forumName,
        description: forumDescription,
        createdAt: new Date(),
        
      });
      alert('ajout reussi ');

      // Réinitialiser les champs après soumission
      setForumName('');
      setForumDescription('');
    } catch (err) {
      setError('Une erreur est survenue lors de la création du forum.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Créer un nouveau forum</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Nom du forum</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={forumName}
            onChange={(e) => setForumName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Description du forum</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={forumDescription}
            onChange={(e) => setForumDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Création en cours...' : 'Créer le forum'}
        </button>
      </form>
    </div>
  );
};

export default AddForum;
