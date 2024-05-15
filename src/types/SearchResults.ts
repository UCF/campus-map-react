import { GeoJsonProperties } from 'geojson';

export interface SearchResults {
  locationResults?: Array<GeoJsonProperties>,
  departmentResults?: Array<GeoJsonProperties>,
  emergencyPhoneResults?: Array<GeoJsonProperties>,
  diningResults?: Array<GeoJsonProperties>,
}
