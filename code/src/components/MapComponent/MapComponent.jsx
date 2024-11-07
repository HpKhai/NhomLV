// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'

// const MapComponent = () => {
//   const [position, setPosition] = useState([10.0303, 105.7842]); // Vị trí mặc định

//   // Lấy vị trí hiện tại của người dùng (nếu cho phép)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);
//         },
//         (error) => {
//           console.error("Không thể lấy vị trí:", error);
//         }
//       );
//     }
//   }, []);

//   return (
//     <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '300px', width: '80%' }}>
//       <TileLayer
//       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//       </Marker>
  
//     </MapContainer>
//   )
// }

// export default MapComponent;
