import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';

function InnovationList() {
  const [innovations, setInnovations] = useState([]);

  useEffect(() => {
    const fetchInnovations = async () => {
      const querySnapshot = await getDocs(collection(db, 'innovations'));
      const innovationsData = querySnapshot.docs.map(doc => doc.data());
      setInnovations(innovationsData);
    };
    fetchInnovations();
  }, []);

  return (
    <div className="p-4">
      <Navigations />
      <h1 className="text-3xl font-bold mb-4">Innovations en Jardinage</h1>
      <ul>
        {innovations.map((innovation, index) => (
          <li key={index} className="mb-2">
            <h2 className="text-xl font-bold">{innovation.title}</h2>
            <p>{innovation.description}</p>
            <p className="text-gray-500">Proposé par: {innovation.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InnovationList;
