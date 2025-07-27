import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Utility component to change map center
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

function HeatMapPage(): React.JSX.Element {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        // fallback to a default location
        setUserLocation([19.0760, 72.8777]); // Default to Mumbai coordinates
      }
    );
  }, []);

  return (
    <div className="py-10 lg:py-4 xl:py-10 px-4 h-full w-full">
      <h1 className="text-3xl font-bold text-white mb-6">Heat Map</h1>

      <div className="h-[500px] w-full rounded-md overflow-hidden shadow-md">
        {userLocation && (
          <MapContainer center={userLocation} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0 relative">
            <ChangeMapView coords={userLocation} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        )}
        {!userLocation && <p className="text-white">Getting your location...</p>}
      </div>
    </div>
  );
}

export default HeatMapPage;
