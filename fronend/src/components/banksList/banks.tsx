import { useNavigate } from "react-router-dom";
import styles from "./banks.module.scss";
import { FiArrowLeft } from "react-icons/fi";
import config from "../../config/config.json";
import { useEffect, useState } from "react";
import { Bank } from "../../types/bank";
import { Coords } from "../../types/coords";
import { Header } from "./banks-header/header";
import { Main } from "./banks-main/main";

export const Banks: React.FC = () => {
  const [banks, setBanks] = useState([]);
  const [bestBank, setBestBank] = useState({name:''});
  const [latitudeInput, setLatitudeInput] = useState(
    Number(window.localStorage.getItem("lat"))
  );
  const [longitudeInput, setLongitudeInput] = useState(
    Number(window.localStorage.getItem("lon"))
  );

  const headerClick = () => {
    setBanks(banks.filter((item: Bank) => item.Bank_Name === bestBank.name));
  };

  useEffect(() => {
    const fetchData = async () => {
      let sortedBanks: any = [];
      const response = await fetch(`${config.base_url}/banks`);
      const banks = await response.json();
      sortedBanks = formatAndSort(banks?.result.banks);
      setBanks(sortedBanks);
      findBestBank(sortedBanks);
    };
    fetchData();
  }, []);

  const findBestBank = (banks: Bank[]) => {
    let uniqueChars = banks
      .filter((item) => item.distance < 7)
      .map((item) => item.Bank_Name)
      .filter((element, index) => {
        return (
          banks
            .filter((item) => item.distance < 7)
            .map((item) => item.Bank_Name)
            .indexOf(element) === index
        );
      });

    let max = 0;
    uniqueChars.map((item) => {
      const count = getOccurrence(
        banks.filter((item) => item.distance < 7).map((item) => item.Bank_Name),
        item
      );
      if (max < count) {
        max = count;
        setBestBank({ name: item });
      }
    });
  };

  function getOccurrence(array: string[], value: string) {
    return array.filter((v) => v === value).length;
  }

  const formatAndSort = (banks: Bank[]) => {
    banks.map((bank, ind) => {
      banks[ind].open_today = checkIfOpenToday(bank.day_closed);
      banks[ind].distance = calculateDistance(
        bank.X_Coordinate,
        bank.Y_Coordinate
      );
    });
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
    return text.split("יום").includes(str) ? "Close" : "Open";
  }

  const calculateDistance = (lat1: number, lon1: number) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(latitudeInput - lat1); // deg2rad below
    var dLon = deg2rad(longitudeInput - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(latitudeInput)) *
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
      <Header bestBank={bestBank} headerClick={headerClick} />
      <Main banks={banks} />
    </div>
  );
};

export default Banks;
