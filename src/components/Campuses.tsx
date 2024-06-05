
interface Campus {
  name: string;
  Latitude: string;
  Longitude: string;
}
interface CampusesProps {
  campusesData: Campus[];
}

const Campuses = ({ campusesData }: CampusesProps) => {

  return (
    <ul>
    { campusesData.map((campusData, index) => (
        <li key={index}>{campusData.name}</li>
      ))}
  </ul>
  );
};

export default Campuses;
