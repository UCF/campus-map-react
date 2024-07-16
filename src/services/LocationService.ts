const LOCATIONS_API_URL = import.meta.env.VITE_LOCATION_API_URL;

export interface LocationResult {
  id: number;
  slug: string;
  status: string;
  link: string;
  title: {rendered: string};
}

export function SearchForLocation(location_name: string) {
  return fetch(`${LOCATIONS_API_URL}?search="${location_name}"`);
}
