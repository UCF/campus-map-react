export interface Feature {
  type: string,
  geometry: {
    type: string,
    coordinates: Array<number>
  }
  properties: {
    name: string,
    description: string,
    Name: string,
    Description: string,
    Latitude: string,
    Longitude: string
  }
}

export interface FeatureCollection {
  type: string,
  features: Array<Feature>
}
