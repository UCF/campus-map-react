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
  FillLayer,
  LineLayer,
  Popup,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent,
} from 'react-map-gl';

import {
  FeatureCollection,
  GeoJsonProperties
} from 'geojson';

import {
  MapIcon
} from './components/MapImage';

import './App.scss'
import MapMenu from './components/MapMenu';
import NavigationMenu from './components/NavigationMenu';
import SearchResults from './components/SearchResults';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const HEADER_MENU_ID = import.meta.env.VITE_REMOTE_HEADER_MENU_ID;
const FOOTER_MENU_ID = import.meta.env.VITE_REMOTE_FOOTER_MENU_ID;

function App() {
  const [mapState, setMapState] = useState({
    lng: -81.200142,
    lat: 28.602368,
    zoom: 15
  });

  const [popupData, setPopupData] = useState<MapboxGeoJSONFeature|null>(null);

  const [visibility, setVisibility] = useState({
    locations: true,
    departments: true,
    emPhones: false,
    dining: false,
    bikes: false,
    family: false,
    housing: false,
    pantry: false,
    labs: false,
    art: false,
    rec: false,
    retail: false,
    services: false,
    parking: false,
    wellBeing: false,
    searchResults: false
  });

  const [locationData, setLocationData] = useState<FeatureCollection>();
  const [departmentsData, setDepartmentsData] = useState<FeatureCollection>();
  const [emPhonesData, setEmPhonesData] = useState<FeatureCollection>();
  const [diningData, setDiningData] = useState<FeatureCollection>();
  const [bikeRackData, setBikeRackData] = useState<FeatureCollection>();
  const [familyData, setFamilyData] = useState<FeatureCollection>();
  const [housingData, setHousingData] = useState<FeatureCollection>();
  const [pantryData, setPantryData] = useState<FeatureCollection>();
  const [labData, setLabData] = useState<FeatureCollection>();
  const [artData, setArtData] = useState<FeatureCollection>();
  const [recData, setRecData] = useState<FeatureCollection>();
  const [retailData, setRetailData] = useState<FeatureCollection>();
  const [servicesData, setServicesData] = useState<FeatureCollection>();
  const [parkingData, setParkingData] = useState<FeatureCollection>();
  const [wellBeingData, setWellBeingData] = useState<FeatureCollection>();
  
  const [searchResults, setSearchResults] = useState<Array<GeoJsonProperties>>([]);

  const handleOnClick = (e: MapLayerMouseEvent) => {
    if (!e.features) setPopupData(null);
    const feature = e.features?.pop();
    if (feature) setPopupData(feature);
  };

  const onSearchResultClick = (result: GeoJsonProperties) => {
    setMapState({
      lng: result!.properties.Longitude,
      lat: result!.properties.Latitude,
      zoom: 18
    });
  };

  const searchData = (searchQuery: string) => {
    const retval: Array<GeoJsonProperties> = [];

    if (searchQuery.length < 4) {
      setSearchResults(retval);
      return;
    }

    if (locationData) {
      let locationResults = locationData.features.filter((e: GeoJsonProperties) => e!.properties.name.includes(searchQuery));
      retval.push(...locationResults);
    }

    if (departmentsData) {
      let departmentResults = departmentsData.features.filter((e: GeoJsonProperties) => e!.properties.name.includes(searchQuery));
      retval.push(...departmentResults);
    }

    if (diningData) {
      let diningResults = diningData.features.filter((e: GeoJsonProperties) => e!.properties.name.includes(searchQuery));
      retval.push(...diningResults);
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

    fetch('/data/geojson/bike-racks.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setBikeRackData(response));

    fetch('/data/geojson/family-combined.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setFamilyData(response));

    fetch('/data/geojson/housingv2.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setHousingData(response));

    fetch('/data/geojson/knightspantry.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setPantryData(response));

    fetch('/data/geojson/labs.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setLabData(response));

    fetch('/data/geojson/public-art-map.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setArtData(response));

    fetch('/data/geojson/recreation.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setRecData(response));

    fetch('/data/geojson/retail.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setRetailData(response));

    fetch('/data/geojson/services.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setServicesData(response));

    fetch('/data/geojson/ucf-parking-combined.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setParkingData(response));

    fetch('/data/geojson/well-being.geojson')
      .then((responseJson) => responseJson.json())
      .then((response) => setWellBeingData(response));
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
      'icon-image': 'phone',
      'visibility': visibility.emPhones! ? 'visible' : 'none'
    }
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

  const bikeRackLayer: SymbolLayer = {
    id: 'bike-rack-layer',
    type: 'symbol',
    layout: {
      'icon-image': 'location',
      'visibility': visibility.bikes! ? 'visible': 'none'
    }
  };

  const familyLayer: SymbolLayer = {
    id: 'family-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.family! ? 'visible': 'none'
    }
  };

  const housingLayer: SymbolLayer = {
    id: 'housing-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.housing! ? 'visible': 'none'
    }
  };

  const pantryLayer: SymbolLayer = {
    id: 'pantry-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.pantry! ? 'visible': 'none'
    }
  };

  const labLayer: SymbolLayer = {
    id: 'lab-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.labs! ? 'visible': 'none'
    }
  };

  const artLayer: SymbolLayer = {
    id: 'art-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.art! ? 'visible': 'none'
    }
  };

  const recLayer: SymbolLayer = {
    id: 'rec-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.rec! ? 'visible': 'none'
    }
  };

  const retailLayer: SymbolLayer = {
    id: 'retail-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.retail! ? 'visible': 'none'
    }
  };

  const servicesLayer: SymbolLayer = {
    id: 'services-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.services! ? 'visible': 'none'
    }
  };

  const parkingFillLayer: FillLayer = {
    id: 'parking-fill-layer',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'fill'],
      'fill-opacity': ['get', 'fill-opacity']
    },
    layout: {
      visibility: visibility.parking! ? 'visible': 'none'
    },
    interactive: true
  };

  const parkingOutlineLayer: LineLayer = {
    id: 'parking-line-layer',
    type: 'line',
    paint: {
      'line-color': ['get', 'stroke'],
      'line-opacity': ['get', 'stroke-opacity'],
      "line-width": 3
    },
    layout: {
      visibility: visibility.parking! ? 'visible': 'none'
    }
  };

  const parkingLabelLayer: SymbolLayer = {
    id: 'parking-label-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.parking! ? 'visible': 'none'
    }
  };

  const wellBeingLayer: SymbolLayer = {
    id: 'well-being-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: visibility.wellBeing! ? 'visible': 'none'
    }
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
          <SearchResults
            searchResults={searchResults}
            searchData={searchData}
            onSearchResultClick={onSearchResultClick} />
          {(searchResults.length === 0) && (<MapMenu
            visibility={visibility}
            setVisibility={setVisibility} />)}
        </div>
        <div className='col-12 col-md-10'>
          <div className='map-container'>
          <Map
            latitude={mapState.lat}
            longitude={mapState.lng}
            zoom={mapState.zoom}
            mapStyle='mapbox://styles/mapbox/streets-v12'
            mapboxAccessToken={ TOKEN }
            interactiveLayerIds={['location-layer', 'departments-layer', 'parking-layer']}
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
              <Source type='geojson' data={bikeRackData}>
                <Layer {...bikeRackLayer} />
              </Source>
              <Source type='geojson' data={familyData}>
                <Layer {...familyLayer} />
              </Source>
              <Source type='geojson' data={housingData}>
                <Layer {...housingLayer} />
              </Source>
              <Source type='geojson' data={pantryData}>
                <Layer {...pantryLayer} />
              </Source>
              <Source type='geojson' data={labData}>
                <Layer {...labLayer} />
              </Source>
              <Source type='geojson' data={artData}>
                <Layer {...artLayer} />
              </Source>
              <Source type='geojson' data={recData}>
                <Layer {...recLayer} />
              </Source>
              <Source type='geojson' data={retailData}>
                <Layer {...retailLayer} />
              </Source>
              <Source type='geojson' data={servicesData}>
                <Layer {...servicesLayer} />
              </Source>
              <Source type='geojson' data={parkingData}>
                <Layer {...parkingFillLayer} />
                <Layer {...parkingOutlineLayer} />
                <Layer {...parkingLabelLayer} />
              </Source>
              <Source type='geojson' data={wellBeingData}>
                <Layer {...wellBeingLayer} />
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
