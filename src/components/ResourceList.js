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
      <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-gray-900 dark:text-white">
    <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Ressource</div>
    <ul>
        {resources.map((resource, index) => (
          <li key={index} className="mb-2">

    <div className="xl:w-[80%] sm:w-[85%] xs:w-[90%] mx-auto flex md:flex-row xs:flex-col lg:gap-4 xs:gap-2 justify-center lg:items-stretch md:items-center mt-4">
      <div className="lg:w-[50%] xs:w-full">
        <img className="lg:rounded-t-lg sm:rounded-sm xs:rounded-sm" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxob21lfGVufDB8MHx8fDE3MTA0OTAwNjl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="billboard image" />
      </div>
      <div className="lg:w-[50%] sm:w-full xs:w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 xs:p-0 rounded-md">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{resource.name}</h2>
        <p className="text-md mt-4">
        {resource.description}
        </p>
        <p><strong>Catégorie:</strong> {resource.category}</p>
      </div>
    </div>
    </li>
        ))}
      </ul>
  </section>
    </div>
  );
}

export default ResourceList;
