import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigations from './Navigations';
import 'leaflet/dist/leaflet.css';
// import './Map.css';

function Map() {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    const fetchGardens = async () => {
      const querySnapshot = await getDocs(collection(db, 'gardens'));
      const gardensData = querySnapshot.docs.map(doc => doc.data());
      console.log(gardensData);
      setGardens(gardensData);
    };
    fetchGardens();
  }, []);

  return (
    <div id="map-container">
    <Navigations />
    <MapContainer center={[14.7278, -17.4342]} zoom={13} className="h-screen">
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {gardens
      .filter(garden => garden.location?.lat && garden.location?.lng) // Filtre pour s'assurer que lat et lng sont définis
      .map((garden, index) => (
        <Marker key={index} position={[garden.location.lat, garden.location.lng]}>
          <Popup>{garden.name}</Popup>
        </Marker>
      ))
    }
  </MapContainer>
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
