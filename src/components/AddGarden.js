import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';

function AddGarden() {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddGarden = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'gardens'), {
        name,
        location: {
            lat: parseFloat(latitude),  // S'assurer que lat et lng sont bien des nombres
            lng: parseFloat(longitude)
          }
      });
      alert('Garden added successfully!');
      setName('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error adding garden:', error);
    }
  };

  return (
    <div className="px-4">
      <Navigations />
    <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
  <div className="mt-3 text-center text-4xl font-bold">Ajouter un jardin</div>
    <form onSubmit={handleAddGarden} className="p-8">
    {/* {error && <p className="text-red-500">{error}</p>} */}
    <div className="text-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
         className="mt-4 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" 
        placeholder="Garden Name"
      />
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
         className="mt-4 block w-2/3 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" 
        placeholder="Latitude"
      />
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
         className="mt-4 block w-2/3 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" 
        placeholder="Longitude"
      />
      <button className="w-1/3 bg-green-500 text-white mt-4 p-2 rounded hover:bg-green-600">
        Ajouter
      </button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default AddGarden;
