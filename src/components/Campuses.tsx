import { Campus } from '../types/Campus';
import './Campuses.scss';

interface CampusesProps {
  campus: Campus[];
  onclick: (campus: Campus) => void;
}

const Campuses = ({ campus, onclick }: CampusesProps) => {
  return (
    <div className="campus-bar d-flex flex-wrap justify-content-center py-2 bg-secondary">
    { campus.map((campusData, index) => (
        <a key={index} onClick={()=> onclick(campusData)} role="button" className="link-underline-light link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover ms-3 ms-md-5 text-white">{campusData.name}</a>
      ))}
  </div>
  );
};

export default Campuses;
