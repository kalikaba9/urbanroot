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
    <div className='px-4 py-4'>
      {/* Top Navigation */}
      <div className="hidden md:flex space-x-4 flex justify-between items-center">
        <a href='/home'>
        <img src="" alt="Urban Roots" className="h-5" />
        </a>
        <nav className="flex space-x-4">
          <a href="/map" className="text-black hover:text-lime-500 transition">Map</a>
          {/* <div className="m-1 hs-dropdown [--trigger:hover] relative inline-flex">
              <button id="hs-dropdown-hover-event" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                Forums
                <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-hover-event">
              <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="/add-forum">
                Ajout de forum
              </a>
            </div>
            </div> */}
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
            <a href="/events" className="text-black px-4 py-2 rounded-full w-64 shadow hover:bg-lime-500 transition">Evenement</a>
            <a href="/resource" className="text-black px-4 py-2 rounded-full w-64 shadow hover:bg-lime-500 transition">Ressource</a>
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
    </div>
  );
};

export default Navigations;
