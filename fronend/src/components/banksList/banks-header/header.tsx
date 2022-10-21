import { Bank } from "../../../types/bank";
import styles from "./header.module.scss";

interface bestBankProps {
  bank: any 
}


export const Header: React.FC <bestBankProps>= ({bank}) => {
  return (
      <div className="header">
        {bank.name}
      </div>
    );
  }
  