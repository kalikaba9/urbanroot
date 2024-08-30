import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
    <form onSubmit={handleAddGarden} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau jardin</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Garden Name"
      />
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Latitude"
      />
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Longitude"
      />
      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Ajouter
      </button>
    </form>
  );
}

export default AddGarden;
