import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const LeafletMap = ({ center, zoom }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // This will run when the component mounts
    if (mapRef.current === null) {
      // Initialize the map
      mapRef.current = L.map('map').setView(center, zoom);

      // Use OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center, zoom]); // This effect will re-run if center or zoom changes

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
};

export default LeafletMap;
