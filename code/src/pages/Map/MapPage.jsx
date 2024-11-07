import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import customIconUrl from '../../components/Image/marker-icon-2x.png'

const MapComponent = () => {
  const [position, setPosition] = useState([10.0303, 105.7842]); // Vị trí mặc định
  const customIcon = new L.Icon({
    iconUrl: customIconUrl, // Đường dẫn tới biểu tượng tùy chỉnh
    iconSize: [25, 41], // Kích thước của biểu tượng
    iconAnchor: [12, 41], // Điểm neo của biểu tượng
    popupAnchor: [1, -34], // Điểm neo của popup
  })
  // Lấy vị trí hiện tại của người dùng (nếu cho phép)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Không thể lấy vị trí:", error);
        }
      );
    }
  }, []);

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       <Marker position={position} icon={customIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>
  
    </MapContainer>
  )
}

export default MapComponent;
