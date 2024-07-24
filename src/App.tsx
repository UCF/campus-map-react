import './App.scss'
import ReactGA from "react-ga4"
// React Imports
import { useEffect, useMemo, useRef, useState } from 'react'

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
  MapLayerMouseEvent,
  MapRef,
  Marker,
  LineLayer
} from 'react-map-gl';

import {
  Popup
} from 'mapbox-gl';

import {
  Feature,
  FeatureCollection,
  GeoJsonProperties
} from 'geojson';

// Import map icons
import locationIcon from './assets/location.png';
import housingIcon from './assets/locations/housing.png';
import diningIcon from './assets/locations/dining.png';
import retailIcon from './assets/locations/retail.png';
import labIcon from './assets/locations/lab.png';
import recreationIcon from './assets/outdoors/recreation.png';
import wellBeingIcon from './assets/outdoors/well-being.png';
import accessibleParkingIcon from './assets/accessibility/accessible-parking.png';
import autoDoorIcon from './assets/accessibility/automatic-doors.png';
import buildingRampIcon from './assets/accessibility/building-ramp.png';
import parkingRampIcon from './assets/accessibility/parking-ramp.png';
import busIcon from './assets/bus.png';
import phoneIcon from './assets/phone.png';
import bikeRackIcon from './assets/other/bike-racks.png';
import familyIcon from './assets/other/family-solid.png';
import pantryIcon from './assets/other/pantry.png';
import artIcon from './assets/other/art.png';
import serviceIcon from './assets/other/student-service.png';

// Import other icons
import ucfLogo from './assets/ucf-logo.png';

// Component imports
import { MapIcon } from './components/MapImage';
import MapMenu from './components/MapMenu';
import NavigationMenu from './components/NavigationMenu';
import SearchResults from './components/SearchResults';
import Campuses from './components/Campuses';
import { LocationResult, SearchForLocation } from './services/LocationService';

// Type Imports
import { Campus }  from './types/Campus';
import { Visibility } from './types/Visibility';

// Data Imports
import campusData from './assets/campuses.json';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const FOOTER_MENU_ID = import.meta.env.VITE_REMOTE_FOOTER_MENU_ID;
const FOOTER_SOCIAL_ID = import.meta.env.VITE_REMOTE_SOCIAL_LINKS_ID;
const REACT_MEASUREMENT_ID = import.meta.env.VITE_REACTGA_MEASUREMENT_ID || '';

function App() {

  if(REACT_MEASUREMENT_ID) {
    ReactGA.initialize(REACT_MEASUREMENT_ID)
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/map/", title: "UCF Campus Map" });
  }
  const initialLng = -81.200142;
  const intitalLat = 28.602368;
  const initialZoom = 15;

  const mapRef = useRef<MapRef>(null);

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

  const [campus, setCampus] = useState<Campus>(campusData[0]);
  
  const [searchResults, setSearchResults] = useState<Array<Feature>>([]);

  const handleOnClick = (e: MapLayerMouseEvent) => {
    if (e.features?.length === 0) return;

    const feature = e.features?.pop();
    const popup = new Popup()
      .setLngLat({
        lat: feature?.properties!['Latitude'],
        lng: feature?.properties!['Longitude']
      })
      .addTo(mapRef.current!.getMap());

    SearchForLocation(feature?.properties?.Name)
      .then((responseText: Response) => responseText.json())
      .then((response: Array<LocationResult>) => {
        let html = '';

        if (response.length > 0) {
          const location = response.pop();

          ReactGA.gtag('event', 'click_internal_link', {
            'event_category': 'link',
            'event_label': `${location!.title.rendered}`,
            'link_text': `${location!.title.rendered}`,
            'link_url': `${location!.link}`
        });
        
          html = `<a class="location-link" href="${location!.link}" onClick="{() => trackLinkClick(${location!.title.rendered}) }" target="_blank">${feature?.properties?.Name}</a>`;
        } else {
          html = `<span class="location-link">${feature?.properties?.Name}</span>`
        }

        popup.setHTML(html);
      });
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

    if (!searchQuery) {
      setSearchResults(retval);
      setSearchResultData({
        type: 'FeatureCollection',
        features: []
      });
      return;
    }

    if (buildingPointData) {
      let locationResults = buildingPointData.features.filter((e: any) => 
        e!.properties!.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e!.properties!.Abbrev.toLowerCase() === searchQuery.toLowerCase() ||
        e!.properties!.BldgNum.toLowerCase() === searchQuery.toLowerCase()
      );
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

    ReactGA.gtag('event', 'click_campus_menu', {
      'event_category': 'campus_menu',
      'event_label': `${campus.name}`,
      'link_text': `${campus.name}`
  });

    mapRef.current!.flyTo({
      center: [
        campus.longitude,
        campus.latitude
      ],
      zoom: campus.zoom
    })

    setCampus(campus);
  }

  const onMouseEnterInteractive = (_: MapLayerMouseEvent) => {
    mapRef.current!.getCanvas().style.cursor = 'pointer';
  }

  const onMouseLeaveInteractive = (_: MapLayerMouseEvent) => {
    mapRef.current!.getCanvas().style.cursor = '';
  }

  useMemo(() => {
    if ( REACT_MEASUREMENT_ID ) {
      ReactGA.initialize(REACT_MEASUREMENT_ID);
  
      // Send pageview with a custom path
      ReactGA.send({ hitType: "pageview", page: "/map/", title: "UCF Campus Map" });
    }
  }, []);

  useMemo(() => {
    // Location data
    fetch('data/geojson/locations/buildingPoints.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingPointData(response));

    fetch('data/geojson/locations/buildingShapes.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingFootprintData(response));

    fetch('data/geojson/locations/dining.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setDiningData(response));

    fetch('data/geojson/locations/housing.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setHousingData(response));

    fetch('data/geojson/locations/labs.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setLabData(response));

    fetch('data/geojson/locations/retail.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setRetailData(response));

    // Parking Data
    fetch('data/geojson/parking.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setParkingData(response));

    // Outdoor Data
    fetch('data/geojson/outdoors/greenspaces.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setGreenSpaceData(response));

    fetch('data/geojson/outdoors/recreation.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setRecreationData(response));

    fetch('data/geojson/outdoors/well-being.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setWellBeingdata(response));

    // Accessibility Data
    fetch('data/geojson/accessibility/accessibleParking.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAccessibleParkingData(response));

    fetch('data/geojson/accessibility/buildingRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBuildingRampData(response));

    fetch('data/geojson/accessibility/curbRamps.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setCurbRampData(response));

    fetch('data/geojson/accessibility/autoDoor.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setAutoDoorData(response));

    // Icon Data
    fetch('data/geojson/shuttles.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setShuttleStopData(response));

    fetch('data/geojson/emergency-phones.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setEmergencyPhoneData(response));

    // Other Data
    fetch('data/geojson/other/bikeRacks.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setBikeRackData(response));

    fetch('data/geojson/other/family.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setFamilyData(response));

    fetch('data/geojson/other/pantry.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setPantryData(response));

    fetch('data/geojson/other/art.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setArtData(response));

    fetch('data/geojson/other/services.geojson')
      .then((responseText) => responseText.json())
      .then((response) => setServiceData(response));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const show = params.get('show');

    if (show !== null && buildingPointData) {
      let results = buildingPointData!.features.filter((e: any) => 
        e!.properties!.BldgNum.toLowerCase() === show.toLowerCase());

      if (results.length > 0) {
        onSearchResultClick(results.pop()!);
      }
    }
  }, [buildingPointData])

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
      'icon-image': 'location',
      visibility: visibility.locations.buildings! ? 'visible': 'none'
    }
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
      "icon-size": 0.4,
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
      "icon-size": 0.8,
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
      "icon-size" : .5,
      visibility: visibility.outdoors.recreation! ? 'visible': 'none'
    },
  };

  const wellBeingLayer: SymbolLayer = {
    id: 'well-being-layer',
    type: 'symbol',
    layout: {
      ...defaultLayoutProps,
      "icon-image": 'wellbeing',
      "icon-size": 0.5,
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
      "icon-size": .5,
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
      "icon-size": 1.8,
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
      "icon-size": 0.7,
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
      "icon-size": 0.5,
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
          <MapMenu
            visibility={visibility}
            setVisibility={setVisibility} />        
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
        interactiveLayerIds={['building-point-layer', 'search-result-layer']}
        onMouseEnter={onMouseEnterInteractive}
        onMouseLeave={onMouseLeaveInteractive}
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
          <Marker longitude={campus.longitude} latitude={campus.latitude} anchor="bottom" >
            <img width={30} src={ucfLogo} />
          </Marker>

          <MapIcon iconName='location' iconImageSource={locationIcon} />
          <MapIcon iconName='housing' iconImageSource={housingIcon} />
          <MapIcon iconName='dining' iconImageSource={diningIcon} />
          <MapIcon iconName='retail' iconImageSource={retailIcon} />
          <MapIcon iconName='lab' iconImageSource={labIcon} />
          <MapIcon iconName='recreation' iconImageSource={recreationIcon} />
          <MapIcon iconName='wellbeing' iconImageSource={wellBeingIcon} />
          <MapIcon iconName='accessible-parking' iconImageSource={accessibleParkingIcon} />
          <MapIcon iconName='auto-door' iconImageSource={autoDoorIcon} />
          <MapIcon iconName='building-ramp' iconImageSource={buildingRampIcon} />
          <MapIcon iconName='parking-ramp' iconImageSource={parkingRampIcon} />
          <MapIcon iconName='bus' iconImageSource={busIcon} />
          <MapIcon iconName='phone' iconImageSource={phoneIcon} />
          <MapIcon iconName='bike-rack' iconImageSource={bikeRackIcon} />
          <MapIcon iconName='family' iconImageSource={familyIcon} />
          <MapIcon iconName='pantry' iconImageSource={pantryIcon} />
          <MapIcon iconName='art' iconImageSource={artIcon} />
          <MapIcon iconName='service' iconImageSource={serviceIcon} />
        </Map>
      </div>
      <footer className='footer pt-2'>
          <div className="d-flex justify-content-center">
            <div className="flex-shrink-0">
              <img className='footer-logo-map' src={ucfLogo} alt="pegasus logo" />
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
