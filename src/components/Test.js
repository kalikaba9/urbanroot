import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';


function Test() {
  const [forumName, setForumName] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ajout du forum à Firestore
      await addDoc(collection(db, 'forums'), {
        name: forumName,
        description: forumDescription,
        createdAt: new Date(),
        
      });
      alert('ajout reussi ');

      // Réinitialiser les champs après soumission
      setForumName('');
      setForumDescription('');
    } catch (err) {
      setError('Une erreur est survenue lors de la création du forum.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='px-4'>
    <Navigations />
    <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
  <div className="mt-3 text-center text-4xl font-bold">Ajouter un forum</div>
  <form className='p-8' onSubmit={handleSubmit}>
    {error && <p className="text-red-500">{error}</p>}
    <div className="flex gap-4">
      <input 
      type="Name" 
      name="name" 
      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" 
      placeholder="Nom du forum *" 
      value={forumName}
      onChange={(e) => setForumName(e.target.value)}
      required
      />
    </div>
    
    <div className="my-6">
      <textarea 
      name="textarea" 
      id="text" 
      cols="30" 
      rows="10" 
      className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
      value={forumDescription}
      onChange={(e) => setForumDescription(e.target.value)}
      required
      >
        Message
      </textarea>
    </div>
    <div className="text-center">
      <a className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">Enregistrer</a>
    </div>
  </form>
</div>
    </div>
  );
}

export default Test;
