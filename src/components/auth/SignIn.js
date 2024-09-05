import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Logged in user:', userData);
        toast.success("Vous êtes connecté avec succès");
        // alert("Vous êtes connecté avec succès !!!")
        navigate('/home'); // Redirect or perform any action you want after successful login
      } else {
        throw new Error('No user data found');
      }
    } catch (error) {
      toast.danger("Veuillez vérifier vos identifiants");
      setError('Erreur lors de la connexion: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="space-y-6 bg-white p-6 rounded shadow-md w-80" onSubmit={handleSignIn}>
      {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          required
        />
        <div className='mb-4'>
              <a href="/signup" className="ml-2 block text-sm text-blue-900">
                  S'inscrire
              </a>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default SignIn;
