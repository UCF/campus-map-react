import { useState } from 'react'
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  SymbolLayer,
  Popup,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent
} from 'react-map-gl';

import {
  MapIcon
} from './components/MapImage';

import './App.scss'
import MapMenu from './components/MapMenu';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const [lng] = useState(-81.200142);
  const [lat] = useState(28.602368);
  const [zoom] = useState(15);

  const [popupData, setPopupData] = useState<MapboxGeoJSONFeature|null>(null);

  const handleOnClick = (e: MapLayerMouseEvent) => {
    if (!e.features) setPopupData(null);
    const feature = e.features?.pop();
    if (feature) setPopupData(feature);
  };

  const [visibility, setVisibility] = useState({
    locations: true,
    departments: true,
    emPhones: false,
    dining: false,
  });

  const locationLayer: SymbolLayer = {
    id: 'location-layer',
    type: 'symbol',
    layout: {
      "icon-image": 'location',
      'icon-allow-overlap': true,
      "icon-text-fit": 'both',
      'visibility': visibility.locations! ? "visible" : "none"
    },
    interactive: true
  };

  const departmentsLayer: SymbolLayer = {
    id: 'departments-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'building',
      'icon-allow-overlap': true,
      'visibility': visibility.departments! ? "visible" : "none"
    },
    interactive: true
  };

  const emPhonesLayer: SymbolLayer = {
    id: 'emergency-phones-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'phone',
      'icon-allow-overlap': true,
      'visibility': visibility.emPhones! ? "visible" : "none"
    },
    interactive: true
  };

  const diningLayer: SymbolLayer = {
    id: 'dining-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'food',
      'icon-allow-overlap': true,
      'visibility': visibility.dining! ? "visible" : "none"
    },
    interactive: true
  };

  return (
    <div className='container-fluid'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <span className='navbar-brand pl-4'>UCF Campus Map</span>
        <div className='container'>
          <button className='navbar-toggler justify-self-right' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <p>Navigation Menu goes here</p>
          </div>
        </div>
      </nav>
      <div className="row gx-0">
        <div className='col-12 col-md-2 px-0 px-md-3 bg-light'>
          <MapMenu
            visibility={visibility}
            setVisibility={setVisibility} />
        </div>
        <div className='col-12 col-md-10'>
          <div className='map-container'>
          <Map initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: zoom
            }}
            mapStyle='mapbox://styles/mapbox/streets-v12'
            mapboxAccessToken={ TOKEN }
            interactiveLayerIds={['location-layer', 'departments-layer']}
            onClick={handleOnClick}>
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
              <Source type="geojson" data="/data/geojson/maps_data_dining.geojson">
                <Layer {...diningLayer} />
              </Source>

              {popupData && (
                <Popup
                  key={popupData.properties!['name']}
                  latitude={popupData.properties!['Latitude']}
                  longitude={popupData.properties!['Longitude']}
                  onClose={() => setPopupData(null)}
                  closeButton={true}>
                    <span className="location-title">{popupData.properties!['Name']}</span>
                  </Popup>
              )}
              <MapIcon iconName='location' iconImageSource='/img/location.png' />
              <MapIcon iconName='building' iconImageSource='/img/building.png' />
              <MapIcon iconName='food' iconImageSource='/img/food.png' />
              <MapIcon iconName='handicap' iconImageSource='/img/handicap.png' />
              <MapIcon iconName='phone' iconImageSource='/img/phone.png' />
            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
