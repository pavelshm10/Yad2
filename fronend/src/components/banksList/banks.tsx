import { useNavigate } from "react-router-dom";
import styles from "./banks.module.scss";
import { FiArrowLeft } from "react-icons/fi";
import config from "../../config/config.json";
import { useEffect, useState } from "react";
import { Bank } from "../../types/bank";
import { Coords } from "../../types/coords";

interface CoordsProps {
  latitude: number;
  longitude: number;
}

export const Banks: React.FC<CoordsProps> = ({ latitude, longitude }) => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [latitudeInput, setLatitudeInput] = useState(latitude);
  const [longitudeInput, setLongitudeInput] = useState(longitude);
  
  useEffect(() => {
    const fetchData = async () => {
      let sortedBanks: any = [];
      const response = await fetch(`${config.base_url}/banks`);
      const banks = await response.json();
      sortedBanks = formatAndSort(banks?.result.banks);
      setBanks(sortedBanks);
    };
    fetchData();
  }, []);

  const formatAndSort = (banks: Bank[]) => {
    // setBanksList(...banks);
    banks.map((bank, ind) => {
      banks[ind].open_today = checkIfOpenToday(bank.day_closed);
      banks[ind].distance = calculateDistance(
        bank.X_Coordinate,
        bank.Y_Coordinate,
        latitudeInput,
        longitudeInput
      );
    
    });
    banks.sort((a, b) => a.distance - b.distance);
    return banks.sort((a, b) => a.distance - b.distance);
  };

  function checkIfOpenToday(text: string) {
    const dayOfWeek = new Date().getDay();
    let str = "";
    switch (dayOfWeek) {
      case 0:
        str = "א";
        break;
      case 1:
        str = " ב";
        break;
      case 2:
        str = " ג";
        break;
      case 3:
        str = " ד";
        break;
      case 4:
        str = " ה";
        break;
      case 5:
        str = " ו";
        break;
      case 6:
        str = " ש";
        break;
    }
    return text.split("יום").includes(str) ? 'Close' :  'Open';
  }

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  return (
    <div className={styles.banks}>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Bank code</th>
              <th>Branch Name</th>
              <th>Branch Code</th>
              <th>Address</th>
              <th>Open today</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {banks?.map((item: Bank, index) => (
              <tr key={index}>
                <td>{item.Bank_Name}</td>
                <td>{item.Bank_Code}</td>
                <td>{item.Branch_Name}</td>
                <td>{item.Branch_Code}</td>
                <td>
                  {item.Branch_Address}, {item.City}
                </td>
                <td>{item.open_today}</td>
                <td>{item.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <button className={styles.back_btn} onClick={() => navigate("/home")}>
          {" "}
          <FiArrowLeft />
          Back home
        </button>
      </div>
    </div>
  );
};

export default Banks;
