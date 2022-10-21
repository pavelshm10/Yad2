import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Bank } from "../../../types/bank";
import styles from "./main.module.scss";

interface banksProps {
  banks: Bank[];
}

export const Main: React.FC<banksProps> = ({ banks }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <button className={styles.back_btn} onClick={() => navigate("/home")}>
        <FiArrowLeft />
      </button>
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
  );
};
