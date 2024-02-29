import { FC } from "react";
import styles from './Button.module.scss';

interface IBtn {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
}

const Button: FC<IBtn> = ({ text, handleClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.button}
      disabled={disabled}
    >
      {text}
    </button>
  )
};

export default Button;