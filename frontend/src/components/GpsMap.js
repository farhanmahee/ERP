import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function GpsMap({ entityType }) {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/gps/${entityType}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to fetch GPS locations');
        } else {
          setLocations(data);
        }
      } catch (err) {
        setError('Server error');
      }
    };
    fetchLocations();
  }, [entityType]);

  return (
    <div className="h-[600px] w-full">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={`${loc.entityType}-${loc.entityId}`} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <div>
                <p><strong>Type:</strong> {loc.entityType}</p>
                <p><strong>ID:</strong> {loc.entityId}</p>
                <p><strong>Last Updated:</strong> {new Date(loc.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default GpsMap;
