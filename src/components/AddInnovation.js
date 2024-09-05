import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigations from './Navigations';

function AddInnovation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Stocke l'utilisateur connecté
      } else {
        setUser(null); // Aucun utilisateur connecté
      }
    });

    return () => unsubscribe(); // Nettoyer l'écouteur lors du démontage
  }, []);

  const handleAddInnovation = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour proposer une innovation.');
      return;
    }

    try {
      await addDoc(collection(db, 'innovations'), {
        title,
        description,
        author: user.displayName || user.email, // Utilisateur connecté
        createdAt: new Date().toISOString()
      });
      alert('Innovation ajoutée avec succès!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'innovation:', error);
    }
  };

  return (
    <div className="px-4">
      <Navigations />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
      <div className="mt-3 text-center text-4xl font-bold">Ajouter une innovation</div>
      <form onSubmit={handleAddInnovation} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Titre de l'innovation"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Description"
        />
        <div className="text-center">
        <button type="submit" className="bg-blue-500 w-52 text-white p-2 rounded">Ajouter</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddInnovation;
