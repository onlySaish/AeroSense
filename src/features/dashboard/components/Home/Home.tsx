import React, { useEffect, useState } from 'react';
import { getAirQualityData } from './components/HomeApi';

interface LocationData {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  pollutants: Record<string, string | null>;
}

const parameters = ['PM25', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'NO', 'TEMPERATURE', 'RELATIVEHUMIDITY'];

const Home = (): React.JSX.Element => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationsData, setLocationsData] = useState<LocationData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Get current geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocation([19.0760, 72.8777]); // fallback: Mumbai
      }
    );
  }, []);

  // Fetch air quality data
  useEffect(() => {
  if (location) {
    getAirQualityData(location[0], location[1])
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLocationsData(res.data); // still incorrect!
        } else if (Array.isArray(res.data)) {
          setLocationsData(res.data); // ✅ CORRECT way
          setSelectedIndex(0);
        }
      })
      .finally(() => setLoading(false));
    }
  }, [location]);
  const selectedLocation = locationsData[selectedIndex];

  return (
    <div className="py-10 lg:py-4 xl:py-10 px-4 h-full w-full">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-white">Fetching air quality data...</p>
      ) : locationsData.length === 0 ? (
        <p className="text-white">No nearby air quality stations found.</p>
      ) : (
        <>
          {/* Location Dropdown */}
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-2">
            <label className="block text-white text-lg font-medium mb-2">
              🌍 Select Nearby Location
            </label>
            <div className="relative w-full max-w-md">
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="block w-full px-4 py-3 bg-gray-800 text-white text-base rounded-lg shadow-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locationsData.map((loc, idx) => (
                  <option key={idx} value={idx} className="text-black">
                    {loc.location}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
              
          {/* Pollutant Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {parameters.map((param) => (
              <div
                key={param}
                className="bg-gray-800 text-white p-4 rounded shadow text-center break-words"
              >
                <h2 className="text-xl font-semibold mb-2">{param}</h2>
                <p className="text-lg">
                  {selectedLocation.pollutants[param] ?? 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
