import { useMemo, useState } from 'react'
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
import NavigationMenu from './components/NavigationMenu';
import { Feature, FeatureCollection } from './types/MapData';
import { SearchResults } from './types/SearchResults';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const HEADER_MENU_ID = import.meta.env.VITE_REMOTE_HEADER_MENU_ID;
const FOOTER_MENU_ID = import.meta.env.VITE_REMOTE_FOOTER_MENU_ID;

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

  const [locationData, setLocationData] = useState<FeatureCollection>();
  const [departmentsData, setDepartmentsData] = useState<FeatureCollection>();
  const [emPhonesData, setEmPhonesData] = useState<FeatureCollection>();
  const [diningData, setDiningData] = useState<FeatureCollection>();
  const [searchResults, setSearchResults] = useState<SearchResults>([]);

  const searchData = (searchQuery: string) => {
    if (searchQuery.length < 4) return {};

    const retval: SearchResults = {
      locationResults: [],
      departmentResults: [],
      diningResults: []
    }

    if (locationData) {
      let locationResults = locationData.features.filter((e: Feature) => e.properties.name.includes(searchQuery));
      retval.locationResults = locationResults;
    }

    if (departmentsData) {
      let departmentResults = departmentsData.features.filter((e: Feature) => e.properties.name.includes(searchQuery));
      retval.departmentResults = departmentResults;
    }

    if (diningData) {
      let diningResults = diningData.features.filter((e: Feature) => e.properties.name.includes(searchQuery));
      retval.diningResults = diningResults;
    }

    setSearchResults(retval);
  };

  useMemo(() => {
    fetch('/data/geojson/buildingsv2.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setLocationData(response));

    fetch('/data/geojson/departments.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setDepartmentsData(response));

    fetch('/data/geojson/emergency-phones2.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setEmPhonesData(response));

    fetch('/data/geojson/maps_data_dining.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setDiningData(response));
  }, []);

  const defaultLayoutProps: any = {
    'icon-allow-overlap': true,
    'text-field': ['get', 'name'],
    'text-font': [
      'Open Sans Semibold',
      'Arial Unicode MS Bold'
    ],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
  };

  const locationLayer: SymbolLayer = {
    id: 'location-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      'visibility': visibility.locations! ? 'visible' : 'none'
    },
    interactive: true
  };

  const departmentsLayer: SymbolLayer = {
    id: 'departments-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'building',
      'visibility': visibility.departments! ? 'visible' : 'none'
    },
    interactive: true
  };

  const emPhonesLayer: SymbolLayer = {
    id: 'emergency-phones-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'phone',
      'visibility': visibility.emPhones! ? 'visible' : 'none'
    },
    interactive: true
  };

  const diningLayer: SymbolLayer = {
    id: 'dining-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'food',
      'visibility': visibility.dining! ? 'visible' : 'none'
    },
    interactive: true
  };

  return (
    <div className='container-fluid px-0'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light px-2'>
        <span className='navbar-brand pl-4'>UCF Campus Map</span>
        <div className='container'>
          <button className='navbar-toggler justify-self-right' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <NavigationMenu
              listClasses='navbar-nav d-flex justify-content-evenly mb-2 mb-lg-0 w-100'
              menuId='header-menu'
              remoteMenuId={HEADER_MENU_ID} />
          </div>
        </div>
      </nav>
      <div className='row gx-0'>
        <div className='col-12 col-md-2 px-0 px-md-3 bg-light'>
          <MapMenu
            visibility={visibility}
            setVisibility={setVisibility}
            searchResults={searchResults}
            searchData={searchData} />
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
              <GeolocateControl position='top-left' />
              <FullscreenControl position='top-left' />
              <NavigationControl position='top-left' />
              <ScaleControl />
              <Source type='geojson' data={locationData}>
                <Layer {...locationLayer} />
              </Source>
              <Source type='geojson' data={departmentsData}>
                <Layer {...departmentsLayer} />
              </Source>
              <Source type='geojson' data={emPhonesData}>
                <Layer {...emPhonesLayer} />
              </Source>
              <Source type='geojson' data={diningData}>
                <Layer {...diningLayer} />
              </Source>

              {popupData && (
                <Popup
                  key={popupData.properties!['name']}
                  latitude={popupData.properties!['Latitude']}
                  longitude={popupData.properties!['Longitude']}
                  onClose={() => setPopupData(null)}
                  closeButton={true}>
                    <span className='location-title'>{popupData.properties!['Name']}</span>
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
      <footer className='footer'>
        <div className='title'>
          <a
            className='title-link'
            href='https://www.ucf.edu'>
            University of Central Florida
          </a>
        </div>
        <div className='ucf-footer-nav'>
          <NavigationMenu
            listItemClasses='nav-item my-2'
            anchorClasses='nav-link text-white py-0'
            menuId='footer-menu'
            remoteMenuId={FOOTER_MENU_ID} />
        </div>
        <div className='address'>
		      4000 Central Florida Blvd. Orlando, Florida, 32816 | <a className='text-white' href='tel:4078232000'>407.823.2000</a>
        </div>
        <div className='copyright'>
		      © <a className='text-white' href='https://www.ucf.edu/'>University of Central Florida</a>
        </div>
      </footer>
    </div>
  )
}

export default App
