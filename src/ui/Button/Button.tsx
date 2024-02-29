import { FC } from "react";
import styles from './Button.module.scss';

interface IBtn {
  text: string;
  handleClick: () => void;
}

const Button: FC<IBtn> = ({ text, handleClick }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.button}
    >
      {text}
    </button>
  )
};

export default Button;