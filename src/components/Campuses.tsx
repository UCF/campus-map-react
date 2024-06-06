import './Campuses.scss';

interface Campus {
  name: string;
  latitude: string;
  longitude: string;
  zoom: string;
}
interface CampusesProps {
  campusesData: Campus[];
  campusHandler: (latitude: string, longitude: string, zoom: string) => void;
}

const Campuses = ({ campusesData, campusHandler }: CampusesProps) => {
  return (
    <div className="campus-bar d-flex flex-wrap justify-content-center py-2 bg-secondary">
    { campusesData.map((campusData, index) => (
        <a key={index} onClick={()=> campusHandler(campusData.latitude, campusData.longitude, campusData.zoom)} role="button" className="link-underline-light link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover ms-3 ms-md-5 text-white">{campusData.name}</a>
      ))}
  </div>
  );
};

export default Campuses;
