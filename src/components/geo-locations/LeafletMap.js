import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/**
 * Renders a Leaflet map with dynamic markers.
 * @param {Array} center Array of latitude and longitude for the map's center.
 * @param {number} zoom Zoom level for the map.
 * @param {Array} markers An array of objects representing markers. Each object should have `lat`, `lng`, and `text` properties.
 * @returns {JSX.Element}
 */
const LeafletMap = ({ center, zoom , selectedCase, selectedAlgorithm}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [positions, setPositions] = useState([])


  // Initialize the map only once
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  // Update the map's center and zoom level
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  // Handle markers
  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });
      let counter = 0;
      if(!selectedAlgorithm || !selectedCase){
        return;
      }

      if(selectedAlgorithm.specification.data.values === []){
        return;
      }

      // Add new markers
      selectedAlgorithm.specification.data.values.forEach(marker => {
        const text = "marker " + counter++;
        const { ContentLatitude, ContentLongitude } = marker;
        const markerInstance = L.marker([ContentLatitude, ContentLongitude]).addTo(mapInstanceRef.current);
        if (text) {
          markerInstance.bindPopup(text);
        }
      });
    }
  }, [selectedCase, selectedAlgorithm]); // Re-run when markers change

  return <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }}></div>;
};

export default LeafletMap;
