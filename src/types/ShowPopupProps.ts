import { MapRef } from 'react-map-gl'

export interface ShowPopupProps {
  mapRef: React.RefObject<MapRef>;
  latitude: number;
  longitude: number;
  name: string;
}
