import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';
import Footer from './Footer';

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
    <div className="">
      <Navigations />
      <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-gray-900 dark:text-white">
    <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Innovation en jardinage</div>
    <ul className='grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8'>
    {innovations.map((innovation, index) => (
    <li key={index} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
    <div className="">
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
        <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none">
            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
        </svg>
        <div className="relative pt-10 px-10 flex items-center justify-center">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3">
            </div>
            <img className="relative w-40" src="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png" alt="" />
        </div>
        <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block font-semibold -mb-1">{innovation.title}</span>
            <div className="flex justify-between">
                <span className="block text-black opacity-75 text-xl">{innovation.description}</span>
                
            </div>
            <p className="text-gray-700">Proposé par: {innovation.author}</p>
        </div>
    </div>
    </div>
    </li>
    ))}
    </ul>
    </section>
    <Footer />
    </div>
  );
}

export default InnovationList;
