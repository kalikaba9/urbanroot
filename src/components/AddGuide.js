import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigations from './Navigations';

function AddGuide() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
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

  const handleAddGuide = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour ajouter un guide.');
      return;
    }

    try {
      await addDoc(collection(db, 'guides'), {
        title,
        content,
        category,
        author: user.displayName || user.email, // Utilisateur connecté
        createdAt: new Date().toISOString()
      });
      alert('Guide ajouté avec succès!');
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du guide:', error);
    }
  };

  return (
    <div className='px-4'>
      <Navigations />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
      <div className="mt-3 text-center text-4xl font-bold">Ajouter un guide</div>
      <form onSubmit={handleAddGuide} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Titre du guide"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Contenu du guide"
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

export default AddGuide;
