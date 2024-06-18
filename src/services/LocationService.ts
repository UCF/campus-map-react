const LOCATIONS_API_URL = import.meta.env.VITE_LOCATION_API_URL;

export interface LocationResult {
  id: number;
  slug: string;
  status: string;
  link: string;
}

export function SearchForLocation(location_name: string, setPopupURL: Function) {
  if (location_name) {
    fetch(`${LOCATIONS_API_URL}?search=${location_name}`)
      .then((responseText: Response) => responseText.json())
      .then((response: Array<LocationResult>) => {
        if (response.length > 0) {
          const location = response.pop();
          setPopupURL(location!.link);
        } else {
          setPopupURL(null);
        }
      });
  }
}
