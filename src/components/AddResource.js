import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigations from './Navigations';

function AddResource() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Stocker l'utilisateur connecté
      } else {
        setUser(null); // Aucun utilisateur connecté
      }
    });

    return () => unsubscribe(); // Nettoyer l'écouteur lors du démontage
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour ajouter une ressource.');
      return;
    }

    try {
      await addDoc(collection(db, 'resources'), {
        name,
        description,
        category,
        owner: user.displayName || user.email, // Utiliser les informations de l'utilisateur connecté
        location: {
          lat: 48.8566, // Coordonnées par défaut, à ajuster si besoin
          lng: 2.3522
        },
        createdAt: new Date().toISOString(),
      });
      alert('Ressource ajoutée avec succès!');
      setName('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ressource:', error);
    }
  };

  return (
    <div className="px-4">
      <Navigations />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
      <div className="mt-3 text-center text-4xl font-bold">Ajouter une ressource</div>
      <form onSubmit={handleAddResource} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Nom de la ressource"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Description"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Catégorie"
        />
        <div className="text-center">
        <button type="submit" className="bg-blue-500 w-52 text-white p-2 rounded">Ajouter</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddResource;
