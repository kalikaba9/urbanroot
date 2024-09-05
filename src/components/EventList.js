import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => doc.data());
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <Navigations />
      <section className="w-full mx-auto py-10 bg-gray-50 dark:text-white">
      <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Evenements</div>
    <div class="px-2 mb-12 mx-auto py-8 max-w-4xl">
    {/* <header>
      <h2 class="mb-4 font-semibold dark:text-gray-100 text-2xl text-center">Evenements</h2>
    </header> */}
    {/* <div class=""> */}
     <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center'>
        {events.map((event, index) => (
          <li key={index} className="flex border rounded dark:border-gray-700/50 dark:bg-gray-800 max-w-md">
      {/* <article class=""> */}
        <img class="object-cover w-[140px] h-[200px] rounded-l" loading="lazy" src="https://images.unsplash.com/photo-1684867430634-b1b22843d1f2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Anselm Kiefer" width="140" height="200" />
        <div class="flex flex-col justify-between flex-1 p-2">
          <div class="flex flex-col gap-2">
            <h3 class="font-semibold dark:text-white line-clamp-2">{event.title}</h3>
            <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{event.description}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400"><strong>Date:</strong> {event.date}</p>
          </div>
          <div class="flex items-center justify-end gap-2 dark:text-gray-300 flex-wrap">
          <p className="text-gray-500">Organisé par: {event.organizer}</p>
          </div>
        </div>
      {/* </article> */}
      </li>
      ))}
      </ul>

    {/* </div> */}
  </div>
</section>
    </div>
  );
}

export default EventList;
