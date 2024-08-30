import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';

function GuideList() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      const querySnapshot = await getDocs(collection(db, 'guides'));
      const guidesData = querySnapshot.docs.map(doc => doc.data());
      setGuides(guidesData);
    };
    fetchGuides();
  }, []);

  return (
    <div className="p-4">
      <Navigations />
      <h1 className="text-3xl font-bold mb-4">Guides Éducatifs</h1>
      <ul className='text-center items-center'>
        {guides.map((guide, index) => (
          <li key={index} className="mb-2">
            <h2 className="text-xl font-bold">{guide.title}</h2>
            <p>{guide.content}...</p>
            <p><strong>Catégorie:</strong> {guide.category}</p>
            <p className="text-gray-500">Publié par: {guide.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuideList;
