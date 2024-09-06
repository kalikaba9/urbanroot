import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
import Navigations from './Navigations';
import Footer from './Footer';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import './Map.css';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

function Map() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
  
          // Mise à jour de la position dans Firebase
          const user = auth.currentUser;
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
              location: {
                lat: latitude,
                lng: longitude,
              },
            });
          }
        },
        (error) => {
          console.error("Erreur lors de la récupération de la position :", error);
        }
      );
    }
  }, []);

  // const [gardens, setGardens] = useState([]);

  // useEffect(() => {
  //   const fetchGardens = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'gardens'));
  //     const gardensData = querySnapshot.docs.map(doc => doc.data());
  //     console.log(gardensData);
  //     setGardens(gardensData);
  //   };
  //   fetchGardens();
  // }, []);

  return (
    <div id="map-container">
    <Navigations />
    <div className="h-screen">
      <MapContainer center={position || [48.8566, 2.3522]} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position} icon={L.icon({ iconUrl: 'path/to/custom-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
            <Popup>
              Vous êtes ici !
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
    <Footer />
  </div>
  );
}

export default Map;





// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map() {
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} className="h-screen">
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[51.505, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// export default Map;
