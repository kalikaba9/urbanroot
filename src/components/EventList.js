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
      <h1 className="text-3xl font-bold mb-4">Événements</h1>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-2">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-500">Organisé par: {event.organizer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
