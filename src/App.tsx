import { useEffect, useRef, useState } from 'react'
import mapboxgl, { NavigationControl } from 'mapbox-gl';
import { Map } from 'mapbox-gl';

import './App.css'

mapboxgl.accessToken = 'insertthekeyhere';

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(-81.200142);
  const [lat, setLat] = useState(28.602368);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.addControl(new NavigationControl(), "top-left");

    return () => map.remove();

  });

  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
    </>
  )
}

export default App
