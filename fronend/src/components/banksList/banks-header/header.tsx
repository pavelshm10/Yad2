import { Bank } from "../../../types/bank";
import styles from "./header.module.scss";

interface bestBankProps {
  bestBank: any 
}


export const Header: React.FC <bestBankProps>= ({bestBank}) => {
  return (
      <div className={styles.header}>
        <div className={styles.header_container}>{bestBank.name}</div>
      </div>
    );
  }
  