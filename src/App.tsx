import './App.scss'

// React Imports
import { useMemo, useRef, useState } from 'react'

// Map GL imports
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
  MapRef,
  Marker,
  LineLayer
} from 'react-map-gl';

import {
  Feature,
  FeatureCollection,
  GeoJsonProperties
} from 'geojson';

// Component imports
import { MapIcon } from './components/MapImage';
import MapMenu from './components/MapMenu';
import NavigationMenu from './components/NavigationMenu';
import SearchResults from './components/SearchResults';
import Campuses from './components/Campuses';

// Type Imports
import { Campus }  from './types/Campus';
import { Visibility } from './types/Visibility';

// Data Imports
import campusData from './assets/campuses.json';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const FOOTER_MENU_ID = import.meta.env.VITE_REMOTE_FOOTER_MENU_ID;
const FOOTER_SOCIAL_ID = import.meta.env.VITE_REMOTE_SOCIAL_LINKS_ID;

function App() {
  const initialLng = -81.200142;
  const intitalLat = 28.602368;
  const initialZoom = 15;

  const mapRef = useRef<MapRef>(null);
  const [popupData, setPopupData] = useState<MapboxGeoJSONFeature|null>(null);

  const [visibility, setVisibility] = useState<Visibility>({
    locations: {
      buildings: true,
      housing: false,
      dining: false,
      retail: false,
      labs: false
    },
    parking: false,
    outdoors: {
      greenspaces: false,
      recreation: false,
      wellBeing: false
    },
    accessibility: {
      parking: false,
      buildingRamps: false,
      curbRamps: false,
      autoDoors: false
    },
    shuttleStops: false,
    emergencyPhones: false,
    bikeRacks: false,
    family: false,
    knightsPantry: false,
    art: false,
    studentServices: false
  });

  /**
   * Helper function that clears
   * visibility values to false
   */
  const clearVisibility = () => {
    setVisibility({
      locations: {
        buildings: false,
        housing: false,
        dining: false,
        retail: false,
        labs: false,
      },
      parking: false,
      outdoors: {
        greenspaces: false,
        recreation: false,
        wellBeing: false
      },
      accessibility: {
        parking: false,
        buildingRamps: false,
        curbRamps: false,
        autoDoors: false
      },
      shuttleStops: false,
      emergencyPhones: false,
      bikeRacks: false,
      family: false,
      knightsPantry: false,
      art: false,
      studentServices: false
    });
  };

  // Location Data
  const [buildingPointData, setBuildingPointData] = useState<FeatureCollection>();
  const [buildingFootprintData, setBuildingFootprintData] = useState<FeatureCollection>();
  const [diningData, setDiningData] = useState<FeatureCollection>();
  const [housingData, setHousingData] = useState<FeatureCollection>();
  const [retailData, setRetailData] = useState<FeatureCollection>();
  const [labData, setLabData] = useState<FeatureCollection>();

  // Parking Data
  const [parkingData, setParkingData] = useState<FeatureCollection>();

  // Outdoor Data
  const [greenSpaceData, setGreenSpaceData] = useState<FeatureCollection>();
  const [recreationData, setRecreationData] = useState<FeatureCollection>();
  const [wellBeingData, setWellBeingdata] = useState<FeatureCollection>();

  // Accessibility data
  const [accessibleParkingData, setAccessibleParkingData] = useState<FeatureCollection>();
  const [buildingRampData, setBuildingRampData] = useState<FeatureCollection>();
  const [curbRampData, setCurbRampData] = useState<FeatureCollection>();
  const [autoDoorData, setAutoDoorData] = useState<FeatureCollection>();

  // Icon data
  const [shuttleStopData, setShuttleStopData] = useState<FeatureCollection>();
  const [emergencyPhoneData, setEmergencyPhoneData] = useState<FeatureCollection>();

  // Other resource data
  const [bikeRackData, setBikeRackData] = useState<FeatureCollection>();
  const [familyData, setFamilyData] = useState<FeatureCollection>();
  const [pantryData, setPantryData] = useState<FeatureCollection>();
  const [artData, setArtData] = useState<FeatureCollection>();
  const [serviceData, setServiceData] = useState<FeatureCollection>();
  
  // Search Result data
  const [searchResultData, setSearchResultData] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: []
  });

  const [campusCoordinate, setCampusCoordinate] = useState<Campus>(campusData[0]);
  const [campusIcon, setCampusIcon] = useState<string>(campusData[0].img);
  
  const [searchResults, setSearchResults] = useState<Array<Feature>>([]);

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
      let locationResults = buildingPointData.features.filter((e: any) => e!.properties!.Name.toLowerCase().includes(searchQuery.toLowerCase()));
      retval.push(...locationResults);
    }

    if (retval.length > 0) {
      clearVisibility();
    }

    setSearchResults(retval);
    setSearchResultData({
      type: 'FeatureCollection',
      features: retval
    });
  };

  const campusHandler = (campus: Campus) => {
    mapRef.current!.flyTo({
      center: [
        campus.longitude,
        campus.latitude
      ],
      zoom: campus.zoom
    })

    setCampusCoordinate(campus);
    setCampusIcon(campus.img);
  }

  useMemo(() => {
    // Location data
    fetch('/data/geojson/locations/buildingPoints.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingPointData(response));

    fetch('/data/geojson/locations/buildingShapes.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingFootprintData(response));

    fetch('/data/geojson/locations/dining.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setDiningData(response));

    fetch('/data/geojson/locations/housing.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setHousingData(response));

    fetch('/data/geojson/locations/labs.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setLabData(response));

    fetch('/data/geojson/locations/retail.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setRetailData(response));

    // Parking Data
    fetch('/data/geojson/parking.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setParkingData(response));

    // Outdoor Data
    fetch('/data/geojson/outdoors/greenspaces.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setGreenSpaceData(response));

    fetch('/data/geojson/outdoors/recreation.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setRecreationData(response));

    fetch('/data/geojson/outdoors/well-being.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setWellBeingdata(response));

    // Accessibility Data
    fetch('/data/geojson/accessibility/accessibleParking.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAccessibleParkingData(response));

    fetch('/data/geojson/accessibility/buildingRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingRampData(response));

    fetch('/data/geojson/accessibility/curbRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setCurbRampData(response));

    fetch('/data/geojson/accessibility/autoDoor.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAutoDoorData(response));

    // Icon Data
    fetch('/data/geojson/shuttles.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setShuttleStopData(response));

    fetch('/data/geojson/emergency-phones.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setEmergencyPhoneData(response));

    // Other Data
    fetch('/data/geojson/other/bikeRacks.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBikeRackData(response));

    fetch('/data/geojson/other/family.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setFamilyData(response));

    fetch('/data/geojson/other/pantry.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setPantryData(response));

    fetch('/data/geojson/other/art.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setArtData(response));

    fetch('/data/geojson/other/services.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setServiceData(response));
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

  // Location Layers
  const buildingPointLayer: SymbolLayer = {
    id: 'building-point-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.locations.buildings! ? 'visible': 'none'
    },
  };

  const buildingShapeLayer: FillLayer = {
    id: 'building-shape-layer',
    type: 'fill',
    layout: {
      ...defaultLayoutProps,
      visibility: visibility.locations.buildings! ? 'visible': 'none'
    },
    paint: {
      "fill-color": '#a6a6a6',
      "fill-opacity": .5
    }
  };

  const housingLayer: SymbolLayer = {
    id: 'housing-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'housing',
      visibility: visibility.locations.housing! ? 'visible': 'none'
    },
  };

  const diningLayer: SymbolLayer = {
    id: 'dining-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'dining',
      visibility: visibility.locations.dining! ? 'visible': 'none'
    },
  };

  const retailLayer: SymbolLayer = {
    id: 'retail-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'retail',
      visibility: visibility.locations.retail! ? 'visible': 'none'
    },
  };

  const labLayer: SymbolLayer = {
    id: 'lab-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'lab',
      visibility: visibility.locations.labs! ? 'visible': 'none'
    },
  };

  // Parking Layers
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
      'text-field': ['get', 'name'],
      visibility: visibility.parking! ? 'visible': 'none'
    }
  };

  // Outdoors Layers
  const greenSpaceLayer: FillLayer = {
    id: 'green-space-layer',
    type: 'fill',
    paint: {
      'fill-color': '#228b22',
      'fill-opacity': .5
    },
    layout: {
      visibility: visibility.outdoors.greenspaces! ? 'visible': 'none'
    },
    interactive: true
  };

  const recreationLayer: SymbolLayer = {
    id: 'recreation-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'recreation',
      visibility: visibility.outdoors.recreation! ? 'visible': 'none'
    },
  };

  const wellBeingLayer: SymbolLayer = {
    id: 'well-being-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'wellbeing',
      visibility: visibility.outdoors.wellBeing! ? 'visible': 'none'
    },
  };

  // Accessibility Layers
  const accessibleParkingLayer: SymbolLayer = {
    id: 'accessible-parking-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'accessible-parking',
      visibility: visibility.accessibility.parking! ? 'visible': 'none'
    },
  };

  const buildingRampLayer: SymbolLayer = {
    id: 'building-ramp-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'building-ramp',
      visibility: visibility.accessibility.buildingRamps! ? 'visible': 'none'
    },
  };

  const curbRampLayer: SymbolLayer = {
    id: 'curb-ramp-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'parking-ramp',
      visibility: visibility.accessibility.curbRamps! ? 'visible': 'none'
    },
  };

  const autoDoorLayer: SymbolLayer = {
    id: 'automatic-door-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'auto-door',
      visibility: visibility.accessibility.autoDoors! ? 'visible': 'none'
    },
  };

  // Icon Layers
  const shuttleStopLayer: SymbolLayer = {
    id: 'shuttle-stop-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'bus',
      visibility: visibility.shuttleStops! ? 'visible': 'none'
    },
  };

  const emergencyPhoneLayer: SymbolLayer = {
    id: 'emergency-phone-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'phone',
      visibility: visibility.emergencyPhones! ? 'visible': 'none'
    },
  };

  // Other Resources
  const bikeRackLayer: SymbolLayer = {
    id: 'bike-rack-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'bike-rack',
      visibility: visibility.bikeRacks! ? 'visible': 'none'
    },
  };

  const familyLayer: SymbolLayer = {
    id: 'family-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'family',
      visibility: visibility.family! ? 'visible': 'none'
    },
  };

  const pantryLayer: SymbolLayer = {
    id: 'pantry-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'pantry',
      visibility: visibility.knightsPantry! ? 'visible': 'none'
    },
  };

  const artLayer: SymbolLayer = {
    id: 'art-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'art',
      visibility: visibility.art! ? 'visible': 'none'
    },
  };

  const serviceLayer: SymbolLayer = {
    id: 'service-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'service',
      visibility: visibility.studentServices! ? 'visible': 'none'
    },
  };

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
      <nav className='navbar fixed-top navbar-expand-xl navbar-light bg-light px-2 navbar-custom-style'>
        <span className='navbar-brand pl-4'>Campus Map</span>
        <button className='navbar-toggler justify-self-right mb-1' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='px-0 px-md-3 bg-light navbar-collapse collapse' id="navbarSupportedContent">
          <MapMenu
            visibility={visibility}
            setVisibility={setVisibility} />
        </div>
        
      </nav>
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
            onSearchResultClick={onSearchResultClick} />
          <GeolocateControl position='bottom-right' />
          <FullscreenControl position='bottom-right' />
          <NavigationControl position='bottom-right' />
          <ScaleControl />
          <Source type="geojson" data={buildingFootprintData}>
            <Layer {...buildingShapeLayer} />
          </Source>
          <Source type="geojson" data={buildingPointData}>
            <Layer {...buildingPointLayer} />
          </Source>
          <Source type="geojson" data={housingData}>
            <Layer {...housingLayer} />
          </Source>
          <Source type="geojson" data={diningData}>
            <Layer {...diningLayer} />
          </Source>
          <Source type="geojson" data={retailData}>
            <Layer {...retailLayer} />
          </Source>
          <Source type="geojson" data={labData}>
            <Layer {...labLayer} />
          </Source>
          <Source type="geojson" data={parkingData}>
            <Layer {...parkingFillLayer} />
            <Layer {...parkingOutlineLayer} />
            <Layer {...parkingLabelLayer} />
          </Source>
          <Source type="geojson" data={greenSpaceData}>
            <Layer {...greenSpaceLayer} />
          </Source>
          <Source type="geojson" data={recreationData}>
            <Layer {...recreationLayer} />
          </Source>
          <Source type="geojson" data={wellBeingData}>
            <Layer {...wellBeingLayer} />
          </Source>
          <Source type="geojson" data={accessibleParkingData}>
            <Layer {...accessibleParkingLayer} />
          </Source>
          <Source type="geojson" data={buildingRampData}>
            <Layer {...buildingRampLayer} />
          </Source>
          <Source type="geojson" data={curbRampData}>
            <Layer {...curbRampLayer} />
          </Source>
          <Source type="geojson" data={autoDoorData}>
            <Layer {...autoDoorLayer} />
          </Source>
          <Source type="geojson" data={shuttleStopData}>
            <Layer {...autoDoorLayer} />
          </Source>
          <Source type="geojson" data={autoDoorData}>
            <Layer {...autoDoorLayer} />
          </Source>
          <Source type="geojson" data={shuttleStopData}>
            <Layer {...shuttleStopLayer} />
          </Source>
          <Source type="geojson" data={emergencyPhoneData}>
            <Layer {...emergencyPhoneLayer} />
          </Source>
          <Source type="geojson" data={bikeRackData}>
            <Layer {...bikeRackLayer} />
          </Source>
          <Source type="geojson" data={familyData}>
            <Layer {...familyLayer} />
          </Source>
          <Source type="geojson" data={pantryData}>
            <Layer {...pantryLayer} />
          </Source>
          <Source type="geojson" data={artData}>
            <Layer {...artLayer} />
          </Source>
          <Source type="geojson" data={serviceData}>
            <Layer {...serviceLayer} />
          </Source>
          <Source type="geojson" data={searchResultData}>
            <Layer {...searchResultLayer} />
          </Source>
        
          <Marker longitude={campusCoordinate.longitude} latitude={campusCoordinate.latitude} anchor="bottom" >
            <img src={campusIcon} />
          </Marker>

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
          <MapIcon iconName='housing' iconImageSource='/img/locations/housing.png' />
          <MapIcon iconName='dining' iconImageSource='/img/locations/dining.png' />
          <MapIcon iconName='retail' iconImageSource='/img/locations/retail.png' />
          <MapIcon iconName='lab' iconImageSource='/img/locations/lab.png' />
          <MapIcon iconName='recreation' iconImageSource='/img/outdoors/recreation.png' />
          <MapIcon iconName='wellbeing' iconImageSource='/img/outdoors/well-being.png' />
          <MapIcon iconName='accessible-parking' iconImageSource='/img/accessibility/accessible-parking.png' />
          <MapIcon iconName='auto-door' iconImageSource='/img/accessibility/automatic-doors.png' />
          <MapIcon iconName='building-ramp' iconImageSource='/img/accessibility/building-ramp.png' />
          <MapIcon iconName='parking-ramp' iconImageSource='/img/accessibility/parking-ramp.png' />
          <MapIcon iconName='bus' iconImageSource='/img/bus.png' />
          <MapIcon iconName='phone' iconImageSource='/img/phone.png' />
          <MapIcon iconName='bike-rack' iconImageSource='/img/other/bike-racks.png' />
          <MapIcon iconName='family' iconImageSource='/img/other/family-solid.png' />
          <MapIcon iconName='pantry' iconImageSource='/img/other/pantry.png' />
          <MapIcon iconName='art' iconImageSource='/img/other/art.png' />
          <MapIcon iconName='service' iconImageSource='/img/other/student-service.png' />
        </Map>
      </div>
      <footer className='footer pt-2'>
          <div className="d-flex justify-content-center">
            <div className="flex-shrink-0">
              <img className='footer-logo-map' src="../img/ucf-logo.png" alt="pegasus logo" />
            </div>
              <Campuses campus={campusData} onclick={campusHandler} />
          </div>

        <div className='h3 mb-3 mt-0 my-md-0'><a href='#copyright' className='text-white text-decoration-none'>&#65088;</a></div>
        <NavigationMenu 
            listClasses='ucf-footer-social mb-2 list-unstyled list-group list-group-horizontal d-flex justify-content-center'
            listItemClasses='ucf-footer-social-item ms-1'
            anchorClasses="ucf-footer-social-link"
            menuId='social-links'
            remoteMenuId={FOOTER_SOCIAL_ID}
          /> 
        <div className='ucf-footer-nav'>
          <NavigationMenu
            listItemClasses='nav-item my-2'
            anchorClasses='nav-link text-white py-0'
            menuId='footer-menu'
            remoteMenuId={FOOTER_MENU_ID} />
        </div>
      
        <div id="copyright" className='copyright'>
		      © <a className='text-white' href='https://www.ucf.edu/'>University of Central Florida</a>
        </div>
      </footer>
    </div>
  )
}

export default App
