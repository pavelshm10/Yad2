import { Bank } from "../../../types/bank";
import styles from "./header.module.scss";

interface bestBankProps {
  bestBank: any,
  headerClick: any 
}


export const Header: React.FC <bestBankProps>= ({bestBank,headerClick}) => {
  
  return (
      <div className={styles.header}>
        <div onClick={headerClick} className={styles.header_container}>{bestBank.name}</div>
      </div>
    );
  }
  