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
    <div className="px-4">
      <Navigations />
      <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Guides</div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">

        <div className="sm:col-span-6 lg:col-span-5">
            <a href="#">
                <img className="h-56 bg-cover text-center overflow-hidden"
                    src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Woman holding a mug"
                />
            </a>
        </div>

        <div className="sm:col-span-6 lg:col-span-4">
        <ul className='text-center items-center'>
        {guides.map((guide, index) => (
        <li key={index} className="mb-2">
            <div className="flex items-start mb-3 pb-3">
                <a href="#" className="inline-block mr-3">
                    <img className="w-20 h-20 bg-cover bg-center"
                        src="https://plus.unsplash.com/premium_photo-1663962158789-0ab624c4f17d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRlc3xlbnwwfHwwfHx8MA%3D%3D"
                    />
                </a>
                <div className="text-sm">
                <h2 className="text-xl font-bold">{guide.title}</h2>
                    <p className="text-gray-600 text-xs">Publié par: {guide.author}</p>
                    <a href="#" className="text-gray-900 font-medium hover:text-indigo-600 leading-none">
                    {guide.content}...
                    </a>
                    <p><strong>Catégorie:</strong> {guide.category}</p>
                </div>
            </div>
            </li>
        ))}
        </ul>
        </div>

        <div className="sm:col-span-12 lg:col-span-3">
            <a href="#">
                <img className="h-56 bg-cover text-center overflow-hidden"
                    src="https://images.unsplash.com/photo-1622399444584-9fd1ffef374a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    title="Woman holding a mug"
                />
            </a>
            <div
                className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                <div className="">
                    <a href="#"
                        className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out">
                        Guides Éducatifs 
                    </a>
                    <p className="text-gray-700 text-xs mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>

    </div>
    </div>
    </section>
    </div>
  );
}

export default GuideList;
