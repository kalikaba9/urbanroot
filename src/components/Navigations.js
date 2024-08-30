import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navigations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Utilisateur connecté
      } else {
        setUser(null); // Aucun utilisateur connecté
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null); // Déconnecter l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <div className="hidden md:flex space-x-4 flex justify-between items-center">
        <img src="" alt="Logo" className="h-5" />
        <nav className="flex space-x-4">
          <a href="/map" className="text-black hover:text-lime-500 transition">Map</a>
          <a href="/forums" className="text-black hover:text-lime-500 transition">Forums</a>
          <a href="/guides" className="text-black hover:text-lime-500 transition">Guides</a>
          <a href="/innovations" className="text-black hover:text-lime-500 transition">Innovation</a>
          <a href="/events" className="text-black hover:text-lime-500 transition">Evènement</a>
          <a href="/resource" className="text-black hover:text-lime-500 transition">Ressource</a>
        </nav>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-black">Bienvenue, {user.displayName || user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition">Déconnexion</button>
          </div>
        ) : (
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">Connexion</a>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-600 focus:outline-none">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden h-full bg-white">
          <nav className="grid grid-rows-4">
            <a href="/map" className="px-4 text-black hover:text-lime-500 transition">Map</a>
            <a href="/forums" className="px-4 text-black hover:text-lime-500 transition">Forums</a>
            <a href="/guides" className="px-4 text-black hover:text-lime-500 transition">Guides</a>
            <a href="/innovations" className="px-4 text-black hover:text-lime-500 transition">Innovations</a>
            <a href="/events" className="bg-lime-500 text-black px-4 py-2 rounded-full w-64 shadow hover:bg-lime-500 transition">Evenement</a>
            <a href="/resource" className="bg-lime-500 text-black px-4 py-2 rounded-full w-64 shadow hover:bg-lime-500 transition">Ressource</a>
            {user ? (
              <div className="px-4">
                <span className="text-black block mb-2">Bienvenue, {user.displayName || user.email}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition w-full">Déconnexion</button>
              </div>
            ) : (
              <a href="/login" className="px-4 text-black hover:text-lime-500 transition">Compte</a>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigations;
