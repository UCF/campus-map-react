import { useMemo, useRef, useState } from 'react'
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
  Popup,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef
} from 'react-map-gl';

import {
  Feature,
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
const FOOTER_MENU_ID = import.meta.env.VITE_REMOTE_FOOTER_MENU_ID;

function App() {
  const initialLng = -81.200142;
  const intitalLat = 28.602368;
  const initialZoom = 15;

  const mapRef = useRef<MapRef>(null);
  const [popupData, setPopupData] = useState<MapboxGeoJSONFeature|null>(null);

  const [visibility, setVisibility] = useState({
    buildings: true,
    accessibility: false,
    greenSpaces: false,
    blueLightPhones: false,
    roads: false,
    walkways: false,
    shuttleStops: false,
  });

  // Building data
  const [buildingPointData, setBuildingPointData] = useState<FeatureCollection>();
  const [buildingFootprintData, setBuildingFootprintData] = useState<FeatureCollection>();

  // Accessibility data
  const [accessibleRampData, setAccessibleRampData] = useState<FeatureCollection>();
  const [accessibleParkData, setAccessibleParkData] = useState<FeatureCollection>();
  const [curbRampData, setCurbRampData] = useState<FeatureCollection>();

  // Greenspaces
  const [greenSpaceData, setGreenSpaceData] = useState<FeatureCollection>();

  // Blue light phones
  const [blueLightPhoneData, setBlueLightPhoneData] = useState<FeatureCollection>();

  // Pavement
  const [roadData, setRoadData] = useState<FeatureCollection>();
  const [walkwayData, setWalkwayData] = useState<FeatureCollection>();

  // Shuttle Stops
  const [shuttleStopData, setShuttleStopData] = useState<FeatureCollection>();

  const [searchResultData, setSearchResultData] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: []
  });
  
  const [searchResults, setSearchResults] = useState<Array<Feature>>([]);

  // Hamburger Button Status

  const handleOnClick = (e: MapLayerMouseEvent) => {
    if (!e.features) setPopupData(null);
    const feature = e.features?.pop();
    if (feature) setPopupData(feature);
  };

  const onSearchResultClick = (result: GeoJsonProperties) => {
    mapRef.current!.flyTo({
      center: [
        result!.properties.Longitude,
        result!.properties.Latitude
      ],
      zoom: 17
    })
  };

  const searchData = (searchQuery: string) => {
    const retval: Array<Feature> = [];

    if (searchQuery.length < 4) {
      setSearchResults(retval);
      return;
    }

    if (buildingPointData) {
      let locationResults = buildingPointData.features.filter((e: Feature) => e!.properties!.Name.toLowerCase().includes(searchQuery.toLowerCase()));
      retval.push(...locationResults);
    }

    if (retval.length > 0) {
      setVisibility({
        buildings: false,
        accessibility: false,
        greenSpaces: false,
        blueLightPhones: false,
        roads: false,
        walkways: false,
        shuttleStops: false
      })
    }

    setSearchResults(retval);
    setSearchResultData({
      type: 'FeatureCollection',
      features: retval
    });
  };

  // offcanvas
 
  useMemo(() => {
    fetch('/data/geojson/new/buildingPoints.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingPointData(response));

    fetch('/data/geojson/new/BuildingFootprints.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingFootprintData(response));

    fetch('/data/geojson/new/AccessibilityRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAccessibleRampData(response));

    fetch('/data/geojson/new/AccessibleParking.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAccessibleParkData(response));

    fetch('/data/geojson/new/CurbRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setCurbRampData(response));

    fetch('/data/geojson/new/Greenspaces.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setGreenSpaceData(response));

    fetch('/data/geojson/new/BlueLightPhones.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBlueLightPhoneData(response));

    fetch('/data/geojson/new/vehpave.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setRoadData(response));

    fetch('/data/geojson/new/pedpave.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setWalkwayData(response));

    fetch('/data/geojson/new/ShuttleStops.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setShuttleStopData(response));

  }, []);

  const defaultLayoutProps: any = {
    'icon-allow-overlap': true,
    'text-field': ['get', 'Name'],
    'text-font': [
      'Open Sans Semibold',
      'Arial Unicode MS Bold'
    ],
    'text-offset': [0, 1.25],
    'text-anchor': 'top',
  };

  const buildingPointLayer: SymbolLayer = {
    id: 'building-point-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.buildings! ? 'visible': 'none'
    },
  };

  const buildingShapeLayer: FillLayer = {
    id: 'building-shape-layer',
    type: 'fill',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.buildings! ? 'visible': 'none'
    },
    paint: {
      "fill-color": '#a6a6a6',
      "fill-opacity": .5
    }
  };

  const accessibilityRampLayer: SymbolLayer = {
    id: 'accessibility-ramp-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'handicap',
      visibility: visibility.accessibility! ? 'visible': 'none'
    }
  };

  const accessibilityParkingLayer: SymbolLayer = {
    id: 'accessibility-parking-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'ramp',
      'icon-size': .5,
      visibility: visibility.accessibility! ? 'visible': 'none'
    }
  };

  const curbRampLayer: SymbolLayer = {
    id: 'curb-ramp-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'ramp',
      'icon-size': .5,
      visibility: visibility.accessibility! ? 'visible': 'none'
    }
  };

  const greenSpaceFillLayer: FillLayer = {
    id: 'green-space-layer',
    type: 'fill',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.greenSpaces! ? 'visible': 'none'
    },
    paint: {
      "fill-color": '#4cbb17',
      "fill-opacity": .5
    }
  };

  const blueLightPhoneLayer: SymbolLayer = {
    id: 'blue-light-phone-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'phone',
      visibility: visibility.blueLightPhones! ? 'visible' : 'none'
    }
  };

  const roadLayer: FillLayer = {
    id: 'road-layer',
    type: 'fill',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.roads! ? 'visible': 'none'
    },
    paint: {
      "fill-color": '#428bca',
      "fill-opacity": .5
    }
  };

  const walkwayLayer: FillLayer = {
    id: 'walkway-layer',
    type: 'fill',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.walkways! ? 'visible': 'none'
    },
    paint: {
      "fill-color": '#ffcc00',
      "fill-opacity": .5
    }
  };

  const shuttleStopLayer: SymbolLayer = {
    id: 'shuttle-stop-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'bus',
      'icon-size': 2.0,
      visibility: visibility.shuttleStops! ? 'visible': 'none'
    }
  }

  // BEWARE!!! Old Layers Below!!!
  const searchResultLayer: SymbolLayer = {
    id: 'search-result-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      'icon-image': 'location',
      visibility: searchResults && searchResults.length > 0 ? 'visible' : 'none'
    }
  };

  return (
    <div className='container-fluid px-0'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light px-2'>
        <span className='navbar-brand pl-4'>UCF Campus Map</span>
        <button className='navbar-toggler justify-self-right' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
      </nav>
      <div className='row gx-0'  > 
        <div className='col-12 col-md-2 px-0 px-md-3 bg-light' id="navbarSupportedContent">
          <MapMenu
            visibility={visibility}
            setVisibility={setVisibility} />
        </div>
        <div className='col-12 col-md-10'>
          <div className='map-container'>
          <Map
            initialViewState={{
              latitude: intitalLat,
              longitude: initialLng,
              zoom: initialZoom
            }}
            mapStyle='mapbox://styles/mapbox/streets-v12'
            mapboxAccessToken={ TOKEN }
            interactiveLayerIds={['location-layer', 'departments-layer', 'parking-layer']}
            onClick={handleOnClick}
            ref={mapRef}>
              <SearchResults
                searchResults={searchResults}
                searchData={searchData}
                onSearchResultClick={onSearchResultClick}/>
              <GeolocateControl position='top-right' />
              <FullscreenControl position='top-right' />
              <NavigationControl position='top-right' />
              <ScaleControl />
              <Source type="geojson" data={buildingPointData}>
                <Layer {...buildingPointLayer} />
              </Source>
              <Source type="geojson" data={buildingFootprintData}>
                <Layer {...buildingShapeLayer} />
              </Source>
              <Source type='geojson' data={searchResultData}>
                <Layer {...searchResultLayer} />
              </Source>
              <Source type='geojson' data={accessibleRampData}>
                <Layer {...accessibilityRampLayer} />
              </Source>
              <Source type='geojson' data={accessibleParkData}>
                <Layer {...accessibilityParkingLayer} />
              </Source>
              <Source type='geojson' data={curbRampData}>
                <Layer {...curbRampLayer} />
              </Source>
              <Source type='geojson' data={greenSpaceData}>
                <Layer {...greenSpaceFillLayer} />
              </Source>
              <Source type='geojson' data={blueLightPhoneData}>
                <Layer {...blueLightPhoneLayer} />
              </Source>
              <Source type='geojson' data={roadData}>
                <Layer {...roadLayer} />
              </Source>
              <Source type='geojson' data={walkwayData}>
                <Layer {...walkwayLayer} />
              </Source>
              <Source type='geojson' data={shuttleStopData}>
                <Layer {...shuttleStopLayer} />
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
              <MapIcon iconName='bus' iconImageSource='/img/bus.png' />
              <MapIcon iconName='food' iconImageSource='/img/food.png' />
              <MapIcon iconName='handicap' iconImageSource='/img/handicap.png' />
              <MapIcon iconName='ramp' iconImageSource='/img/ramp.png' />
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
