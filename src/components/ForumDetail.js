import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Importer Firebase Auth
import Navigations from './Navigations';

function ForumDetail() {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null); // Pour stocker les informations de l'utilisateur

  useEffect(() => {
    // Récupérer le forum
    const fetchForum = async () => {
      const docRef = doc(db, 'forums', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForum(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchForum();
  }, [id]);

  useEffect(() => {
    // Vérifier l'état de l'utilisateur
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour envoyer un message.');
      return;
    }

    const docRef = doc(db, 'forums', id);
    await updateDoc(docRef, {
      messages: arrayUnion({
        author: user.displayName || user.email, // Utiliser le nom de l'utilisateur connecté ou l'email s'il n'a pas de nom
        message: newMessage,
        timestamp: new Date().toISOString()
      })
    });
    setNewMessage('');
    const updatedForum = (await getDoc(docRef)).data();
    setForum(updatedForum);
  };

  return (
    <div className="p-4">
      <Navigations />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {forum && (
          <>
            <h1 className="text-3xl font-bold mb-4">{forum.title}</h1>
            <p className="mb-4">{forum.description}</p>
            <ul>
              {forum.messages && forum.messages.map((msg, index) => (
                <li key={index} className="mb-2">
                  <strong>{msg.author}</strong>: {msg.message} <br />
                  <span className="text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddMessage} className="mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border p-2 w-full mb-2"
                placeholder="Écrire un message..."
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Envoyer
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForumDetail;
