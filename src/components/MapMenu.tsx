import './MapMenu.scss';

interface MapMenuProps {
  visibility: {
    locations: boolean,
    departments: boolean,
    emPhones: boolean
  },
  setVisibility: Function
}

export default function MapMenu(props: MapMenuProps) {
    return (
        <div className="mapboxgl-ctrl-top-right">
            <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                <div className="map-menu-panel">
                    <h2>Layers</h2>
                    <div className="input-group">
                        <input
                          type="checkbox"
                          name="locations"
                          checked={props.visibility.locations}
                          onChange={() => props.setVisibility({ ...props.visibility, locations: !props.visibility.locations })}  />
                        <span className="checkbox-label">Locations</span>
                    </div>
                    <div className="input-group">
                    <input
                          type="checkbox"
                          name="departments"
                          checked={props.visibility.departments}
                          onChange={() => props.setVisibility({ ...props.visibility, departments: !props.visibility.departments })}  />
                        <span className="checkbox-label">Departments</span>
                    </div>
                    <div className="input-group">
                    <input
                          type="checkbox"
                          name="emergency-phones"
                          checked={props.visibility.emPhones}
                          onChange={() => props.setVisibility({ ...props.visibility, emPhones: !props.visibility.emPhones })}  />
                        <span className="checkbox-label">Emergency Phones</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
