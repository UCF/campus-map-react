import { Popup } from 'mapbox-gl';
import { LocationResult, SearchForLocation } from '../services/LocationService';
import { ShowPopupProps } from '../types/ShowPopupProps';

const showPopup = ({mapRef, latitude, longitude, name}: ShowPopupProps) => {
  const popup = new Popup()
    .setLngLat({
      lat:latitude,
      lng: longitude
    }
    ).addTo(mapRef.current!.getMap());

  SearchForLocation(name)
    .then((responseText: Response) => responseText.json())
    .then((response: Array<LocationResult>) => {
      let html = '';

      if (response.length > 0) {
        const location = response.pop();
        html = `<a class="location-link" href="${location!.link}" onClick="{() => trackLinkClick(${location!.title.rendered}) }" target="_blank">${name}</a>`;
      } else {
        html = `<span class="location-link">${name}</span>`;
      }

      popup.setHTML(html);
    });

  return null;
}

export default showPopup;
