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

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Date non disponible';
        
        let date;
        // Si c'est un objet Timestamp Firestore, le convertir en Date
        if (timestamp.toDate) {
          date = timestamp.toDate();
        } else {
          date = new Date(timestamp);
        }
        
        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };
  
  return (
    <div className='px-4'>
    <Navigations />
    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
    {forums.map(forum => (
    <li key={forum.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
    
    <div className="order-1 sm:ml-6 xl:ml-0">
        <h3 className="mb-1 text-slate-900 font-semibold">
        <Link to={`/forum/${forum.id}`} className="hover:underline">
            <span className="mb-1 block text-sm leading-6 text-green-900">
            {forum.createdAt && (
                <p className="text-green-900 text-sm">
                  Créé le : {formatDate(forum.createdAt)}
                </p>
            )}
            </span>
            {forum.description}
        </Link>
        </h3>
    <div className="prose prose-slate prose-sm text-slate-600">
        <p>
        Lorem ipsum dolor sit amet. Sit rerum nostrum et voluptates molestiae ut suscipit minima ex maiores quam eos odit reiciendis 
        </p>
    </div>
    </div>
    <Link to={`/forum/${forum.id}`} className="hover:underline">
        <img 
        src="https://plus.unsplash.com/premium_photo-1676110935657-3c43372c8bc2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="" 
        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full" 
        width="1216" 
        height="640"
        />
    </Link>
    </li>
     ))}
</ul>
  </div>
  );
}

export default ForumList;
