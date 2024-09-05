import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; // Assurez-vous que firebaseConfig est bien configuré

function SignUp() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        nom,
        prenom,
        email,
        password,
      });
      alert("inscription réussi avec succès !!!")

      navigate('/'); // Redirigez vers la page d'accueil ou la page de connexion après l'inscription
    } catch (error) {
      alert("Veuillez revoir votre inscription")
      console.error("Erreur lors de l'inscription: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Entrer votre prénom"
          required
        />
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Entrer votre nom"
          required
        />
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
              <a href="/" className="ml-2 block text-sm text-blue-900">
                  J'ai déjà un compte - Se connecter
              </a>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          S'incrire
        </button>
      </form>
    </div>
  );
}

export default SignUp;
