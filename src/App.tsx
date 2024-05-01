import { useState } from 'react'
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  SymbolLayer
} from 'react-map-gl';

import {
  MapIcon
} from './components/MapImage';

import './App.scss'

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [lng, setLng] = useState(-81.200142);
  const [lat, setLat] = useState(28.602368);
  const [zoom, setZoom] = useState(15);

  const [visibility, setVisibility] = useState({
    locations: true,
    departments: true,
    emPhones: true
  });

  const locationLayer: SymbolLayer = {
    id: 'location-layer',
    type: 'symbol',
    layout: {
      "icon-image": 'location',
      'visibility': visibility.locations! ? "visible" : "none"
    }
  };

  const departmentsLayer: SymbolLayer = {
    id: 'departments-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'building',
      'visibility': visibility.departments! ? "visible" : "none"
    }
  };

  const emPhonesLayer: SymbolLayer = {
    id: 'emergency-phones-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'phone',
      'visibility': visibility.emPhones! ? "visible" : "none"
    }
  };

  return (
    <div className='map-container'>
      <Map initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom
        }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        mapboxAccessToken={ TOKEN } >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          <Source type="geojson" data="/data/geojson/buildingsv2.geojson">
            <Layer {...locationLayer} />
          </Source>
          <Source type="geojson" data="/data/geojson/departments.geojson">
            <Layer {...departmentsLayer} />
          </Source>
          <Source type="geojson" data="/data/geojson/emergency-phones2.geojson">
            <Layer {...emPhonesLayer} />
          </Source>

          <MapIcon iconName='location' iconImageSource='/img/location.png' />
          <MapIcon iconName='building' iconImageSource='/img/building.png' />
          <MapIcon iconName='food' iconImageSource='/img/food.png' />
          <MapIcon iconName='handicap' iconImageSource='/img/handicap.png' />
          <MapIcon iconName='phone' iconImageSource='/img/phone.png' />
      </Map>
    </div>
  )
}

export default App
