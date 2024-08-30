import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';

function ResourceList() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const querySnapshot = await getDocs(collection(db, 'resources'));
      const resourcesData = querySnapshot.docs.map(doc => doc.data());
      setResources(resourcesData);
    };
    fetchResources();
  }, []);

  return (
    <div className="p-4">
      <Navigations />
      <h1 className="text-3xl font-bold mb-4">Ressources Disponibles</h1>
      <ul>
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">
            <h2 className="text-xl">{resource.name}</h2>
            <p>{resource.description}</p>
            <p><strong>Catégorie:</strong> {resource.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceList;
