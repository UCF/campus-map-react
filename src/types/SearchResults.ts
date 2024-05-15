import { Feature } from "./MapData";

export interface SearchResults {
  locationResults?: Array<Feature>,
  departmentResults?: Array<Feature>,
  emergencyPhoneResults?: Array<Feature>,
  diningResults?: Array<Feature>,
}
