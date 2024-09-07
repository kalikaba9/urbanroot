import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Importer Firebase Auth
import Navigations from './Navigations';
import Footer from './Footer';

function ForumDetail() {
  const { id } = useParams();
  const [forum, setForum] = useState([]);
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
    <div className='items-center'>
    <Navigations />
    <ul>
        {forum.messages && forum.messages.map((msg, index) => (
        <li key={index} className="mb-2">
    <div class="flex flex-col p-5 lg:px-48 lg:py-2">
    <div class="bg-gray-100 p-5 mb-10">
        <h1 class="font-bold text-2xl mb-2">{forum.title}</h1>
        <p class="my-3">
            {forum.description}
        </p>
        
        <strong>{msg.author}</strong>: {msg.message} <br />
        <span className="text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
            
    </div>
    </div>
    </li>
  ))}
    <form onSubmit={handleAddMessage} className="flex flex-col justify-center items-center mt-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border p-2 w-96 mb-2"
                placeholder="Écrire un message..."
              />
              <button type="submit" className="bg-green-500 w-52 text-white p-2 rounded">
                Envoyer
              </button>
    </form>
  </ul>
  <Footer />
  </div>
  );
}

export default ForumDetail;
