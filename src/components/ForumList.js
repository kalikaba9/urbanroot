import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import Navigations from './Navigations';

function ForumList() {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      const querySnapshot = await getDocs(collection(db, 'forums'));
      const forumsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setForums(forumsData);
    };
    fetchForums();
  }, []);

  return (
    <div className="p-4">
      <Navigations />
      <h1 className="text-3xl font-bold mb-4">Forums Communautaires</h1>
      <ul className='text-center items-center'>
        {forums.map(forum => (
          <li key={forum.id} className="mb-2">
            <Link to={`/forum/${forum.id}`} className="text-blue-500 hover:underline">
              {/* {forum.name} */}
              {forum.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForumList;
