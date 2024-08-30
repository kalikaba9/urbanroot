import { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navigations from './Navigations';

function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
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

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Veuillez vous connecter pour ajouter un événement.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        description,
        date,
        location: {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        },
        organizer: user.displayName || user.email, // Utilisateur connecté
        createdAt: new Date().toISOString(),
      });
      alert('Événement ajouté avec succès!');
      setTitle('');
      setDescription('');
      setDate('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
    }
  };

  return (
    <div className="p-4">
      <Navigations />
      <form onSubmit={handleAddEvent} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Ajouter un Nouvel Événement</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Titre de l'événement"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Description de l'événement"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Date de l'événement"
        />
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="border p-2 w-full mb-4"
          placeholder="Longitude"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
      </form>
    </div>
  );
}

export default AddEvent;
