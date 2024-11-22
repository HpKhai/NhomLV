import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import customIconUrl from '../../components/Image/location-icon.png'
import storeIconUrl from '../../components/Image/cua-hang.png'
import * as StoreService from '../../service/StoreService'

// Khởi tạo biểu tượng tùy chỉnh cho Marker
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const storeIcon = new L.Icon({
  iconUrl: storeIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component cho Routing Control
const RoutingControl = ({ from, to, onRouteFound }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 6 }],
      },
      createMarker: () => null, // Không tạo Marker mặc định
    })
      .on('routesfound', (e) => {
        const route = e.routes[0];
        const distance = route.summary.totalDistance / 1000; // Quãng đường (km)
        onRouteFound(distance); // Gọi hàm onRouteFound với quãng đường
      })
      .addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, from, to, onRouteFound]);

  return null;
};

const MapComponent = () => {
  const [position, setPosition] = useState([0,0]); // Vị trí mặc định gần đó
  const [gpsPosition, setGpsPosition] = useState(null); // Vị trí GPS người dùng
  const [destination, setDestination] = useState(null); // Vị trí người dùng nhấp
  const [showRoute, setShowRoute] = useState(false);
  const [distance, setDistance] = useState(null);
  const [stores, setStores] = useState([]);

  // Lấy danh sách cửa hàng đang có
useEffect(() => {
  const fetchStores = async () => {
    const res = await StoreService.getAllStore('', 100)
    setStores(res.data)
}
fetchStores();
}, []);

  // Lấy vị trí hiện tại của người dùng và cập nhật gpsPosition
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setGpsPosition([latitude, longitude]); // Cập nhật vị trí GPS
        },
        (error) => {
          console.error('Không thể lấy vị trí:', error);
        }
      );
    }
  }, []);

  // Xử lý sự kiện nhấp chuột trên Marker
  const handleMarkerClick = (markerPosition) => {
    setDestination(markerPosition); // Cập nhật điểm đến khi nhấp vào marker
    setShowRoute(true); // Hiển thị chỉ đường
  };

  return (
    <div>
      {gpsPosition && ( 
        <MapContainer
        center={gpsPosition}
        zoom={13}
        style={{ width: '100%', height: '600px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker cho vị trí hiện tại */}

        {/* Marker cho vị trí GPS của người dùng */}
        {gpsPosition && (
          <Marker position={gpsPosition} icon={customIcon}>
            <Popup>Vị trí GPS của bạn</Popup>
          </Marker>
        )}

        {/* Marker cho điểm đến */}
        {
          stores.map((store, index) => ( 
            <Marker
            position={[store.x, store.y]} // Ví dụ về vị trí điểm đến
            icon={storeIcon}
            eventHandlers={{
              click: () => handleMarkerClick([store.x, store.y]), // Nhấp vào marker để chỉ đường
            }}
          >
            <Popup>{ store.name }</Popup>
            </Marker> 
          ))
        }

        {/* Thêm RoutingControl khi có điểm đến */}
        {showRoute && destination && (
          <RoutingControl
            from={gpsPosition || position} // Nếu không có vị trí GPS, sử dụng vị trí mặc định
            to={destination}
            onRouteFound={(distance) => setDistance(distance)}
          />
        )}
      </MapContainer>
)}

      {gpsPosition && distance && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#333', // Nền trắng
            color: 'black', // Chữ đen
            borderRadius: '5px', // Bo góc cho đẹp
            fontWeight: 'bold',
          }}
        >
          <strong>Quãng đường ngắn nhất: </strong>{distance.toFixed(2)} km
        </div>
      )}
    </div>
  );
};

export default MapComponent;
