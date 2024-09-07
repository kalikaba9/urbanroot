import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';
import Footer from './Footer';

const compteur = {
  i: 0,
}

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
    <div className="">
      <Navigations />
      <section className="w-full mx-auto py-10 bg-gray-50 dark:text-white">
      <div className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">Evenements</div>

      <ul class="container mx-auto px-4 py-8">
      {events.map((event, index) => (
    <li key={index} class="relative wrap overflow-hidden">
        <div class="mb-8 absolute h-full p-4 text-center  right-1/2">
        <img src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Leafs" className="" /> 
        </div>
        <div class="mb-8 flex justify-between items-center w-full auto-timeline">
            <div class="order-1 w-5/12"></div>
            <div class="z-20 ml-24 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                <h1 class="mx-auto font-semibold text-lg text-white">{compteur.i++}</h1>
            </div>
            <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 class="mb-3 font-bold text-gray-800 text-xl">{event.title}</h3>
                <p class="text-gray-700 leading-tight">
                {event.description}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Date:</strong> {event.date}
                </p>
            <div class="flex items-center justify-end gap-2 dark:text-gray-300 flex-wrap">
                <p className="text-gray-500">Organisé par: {event.organizer}</p>
            </div>
            </div>
        </div>
        {/* <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
            <div class="order-1 w-5/12"></div>
            <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                <h1 class="mx-auto font-semibold text-lg text-white">2</h1>
            </div>
            <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 class="mb-3 font-bold text-gray-800 text-xl">Event Title</h3>
                <p class="text-gray-700 leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum in nisi commodo, aliquet velit ac, dapibus elit.</p>
            </div>
        </div> */}
        {/* <div class="mb-8 flex justify-between items-center w-full right-timeline">
            <div class="order-1 w-5/12"></div>
            <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                <h1 class="mx-auto font-semibold text-lg text-white">3</h1>
            </div>
            <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 class="mb-3 font-bold text-gray-800 text-xl">Event Title</h3>
                <p class="text-gray-700 leading-tight">
               
                </p>
            </div>
        </div> */}
    </li>
    ))}
</ul>
</section>
<Footer />
    </div>
  );
}

export default EventList;
