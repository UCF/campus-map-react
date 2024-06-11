export interface Visibility {
  locations: {
    buildings: boolean,
    housing: boolean,
    dining: boolean,
    retail: boolean,
    labs: boolean,
  },
  parking: boolean,
  outdoors: {
    greenspaces: boolean,
    recreation: boolean,
    wellBeing: boolean
  },
  accessibility: {
    parking: boolean,
    buildingRamps: boolean,
    curbRamps: boolean,
    autoDoors: boolean
  },
  shuttleStops: boolean,
  emergencyPhones: boolean,
  bikeRacks: boolean,
  family: boolean,
  knightsPantry: boolean,
  art: boolean,
  studentServices: boolean
};
