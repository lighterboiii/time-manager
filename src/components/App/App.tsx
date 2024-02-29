import styles from './App.module.scss';
import Timer from '../Timer/Timer';
import { ChangeEvent, FC, useState } from 'react';
import Button from '../../ui/Button/Button';

const App: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentTimer, setCurrentTimer] = useState(1);
  const [firstTimer, setFirstTimer] = useState<NodeJS.Timeout | null>(null);
  const [secondTimer, setSecondTimer] = useState<NodeJS.Timeout | null>(null);
  const [firstTimerTime, setFirstTimerTime] = useState<number | null>(null);
  const [secondTimerTime, setSecondTimerTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSwitchTimer = () => {
    setCurrentTimer(prevTimer => prevTimer === 1 ? 2 : 1);
    setFirstTimer(null);
    setSecondTimer(null);
    setIsPaused(false);
  };

  const handleStart = () => {
    if (inputValue !== '') {
      if (currentTimer === 1) {
        clearInterval(firstTimer!);
        setFirstTimer(null);
        setFirstTimerTime(parseInt(inputValue) * 60);
        setSecondTimerTime(null);
        setCurrentTimer(1);
        setFirstTimer(setInterval(() => {
          setFirstTimerTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000));
      } else {
        clearInterval(secondTimer!);
        setSecondTimer(null);
        setSecondTimerTime(parseInt(inputValue) * 60);
        setFirstTimerTime(null);
        setCurrentTimer(2);
        setSecondTimer(setInterval(() => {
          setSecondTimerTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000));
      }
      setInputValue('');
    } else {
      clearInterval(firstTimer!);
      clearInterval(secondTimer!);
      setFirstTimer(null);
      setSecondTimer(null);
      setFirstTimerTime(null);
      setSecondTimerTime(null);
      setCurrentTimer(1);
    }
  };

  const handlePause = () => {
    if (currentTimer === 1) {
      if (!isPaused && firstTimer) {
        clearInterval(firstTimer);
        setIsPaused(true);
        setFirstTimerTime(firstTimerTime);
      } else {
        setFirstTimer(setInterval(() => {
          setFirstTimerTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000));
        setIsPaused(false);
      }
    } else {
      if (secondTimer && !isPaused) {
        clearInterval(secondTimer);
        setIsPaused(true);
      } else {
        setSecondTimer(setInterval(() => {
          setSecondTimerTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000));
        setIsPaused(false);
      }
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.app__inputWrapper}>
        <input
          type="number"
          name="time"
          id="time"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.app__input}
          placeholder="Введите время в минутах"
        />
      </div>
      {currentTimer === 1 && firstTimerTime !== null && <Timer time={firstTimerTime} isPaused={isPaused} />}
      {currentTimer === 2 && secondTimerTime !== null && <Timer time={secondTimerTime} isPaused={isPaused} />}
      {(firstTimerTime === null && secondTimerTime === null) &&
        <div className={styles.app__infoText}>
          В поле ввода введите минуты для отсчета и нажмите кнопку "Старт/Cтоп" для запуска таймера
        </div>
      }
      <div className={styles.app__buttons}>
        <Button
          text="Пауза/Продолжить"
          handleClick={handlePause}
          disabled={inputValue === ''}
        />
        <Button
          text="Старт/Стоп"
          handleClick={handleStart}
          disabled={inputValue === ''}
        />
        <Button
          text="Переключить таймер"
          handleClick={handleSwitchTimer}
        />
      </div>
    </div>
  );
}

export default App;
