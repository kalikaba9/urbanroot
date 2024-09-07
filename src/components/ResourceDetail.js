import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import Navigations from './Navigations';
import Footer from './Footer';

function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  const fetchResource = async () => {
    const docRef = doc(db, 'resources', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setResource(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const fetchResource = async () => {
      const docRef = doc(db, 'resources', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResource(docSnap.data());
      } else {
        alert("may you have error network")
        console.log("No such document!");
      }
    };
    fetchResource();
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
        alert('Vous devez être connecté pour envoyer un message.');
        return;
      }
    const docRef = doc(db, 'resources', id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        author: "NomUtilisateur", // Remplacer par l'utilisateur connecté
        comment: newComment,
        timestamp: new Date().toISOString()
      })
    });
    setNewComment('');
    const updatedResource = (await getDoc(docRef)).data();
    setResource(updatedResource);
  };

  const handleLike = async () => {
    const docRef = doc(db, 'resources', id);
    if (resource.likes && resource.likes.includes("UtilisateurID")) {
      await updateDoc(docRef, {
        likes: arrayRemove("UtilisateurID")
      });
    } else {
      await updateDoc(docRef, {
        likes: arrayUnion("UtilisateurID")
      });
    }
    fetchResource();
  };

  const handleDislike = async () => {
    const docRef = doc(db, 'resources', id);
    if (resource.dislikes && resource.dislikes.includes("UtilisateurID")) {
      await updateDoc(docRef, {
        dislikes: arrayRemove("UtilisateurID")
      });
    } else {
      await updateDoc(docRef, {
        dislikes: arrayUnion("UtilisateurID")
      });
    }
    fetchResource();
  };

  return (
    <div className="">
      <Navigations />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
      <div className="max-w-md mx-auto w-full bg-white p-8 rounded-lg shadow-md">
      {resource && (
        <>
          <h1 className="text-3xl font-bold mb-4">{resource.name}</h1>
          <p className="mb-4">{resource.description}</p>
          <ul>
            {resource.comments && resource.comments.map((comment, index) => (
              <li key={index} className="mb-2">
                <strong>{comment.author}</strong>: {comment.comment} <br />
                <span className="text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddComment} className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Ajouter un commentaire..."
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Ajouter
            </button>
          </form>
          <div className="flex mt-4 space-x-4">
              <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded">
                Like {resource.likes ? resource.likes.length : 0}
              </button>
              <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded">
                Dislike {resource.dislikes ? resource.dislikes.length : 0}
              </button>
            </div>
            {/* <ul>
              {resource.comments && resource.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <strong>{comment.author}</strong>: {comment.comment} <br />
                  <span className="text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul> */}
        </>
      )}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default ResourceDetail;
