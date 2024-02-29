import { FC, useEffect, useState } from "react";
import styles from './Timer.module.scss';

const Timer: FC = () => {
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(prevState => prevState - 1);
          setSeconds(60);
        }
      } else {
        setSeconds(prevState => prevState - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className={styles.timer}>
      <h1>{`${minutes.toString()}:${seconds.toString()}`}</h1>
    </div>
  )
};

export default Timer;