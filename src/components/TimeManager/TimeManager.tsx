import styles from './TimeManager.module.scss';
import Timer from '../Timer/Timer';
import { ChangeEvent, FC, useEffect, useState, KeyboardEvent } from 'react';
import Button from '../../ui/Button/Button';

const TimeManager: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentTimer, setCurrentTimer] = useState(1);
  const [firstTimer, setFirstTimer] = useState<NodeJS.Timeout | null>(null);
  const [secondTimer, setSecondTimer] = useState<NodeJS.Timeout | null>(null);
  const [firstTimerTime, setFirstTimerTime] = useState<number | null>(null);
  const [secondTimerTime, setSecondTimerTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timerSwitchedMessageVisible, setTimerSwitchedMessageVisible] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSwitchTimer = () => {
    setCurrentTimer(prevTimer => prevTimer === 1 ? 2 : 1);
    setFirstTimer(null);
    setSecondTimer(null);
    setIsPaused(false);
    setTimerSwitchedMessageVisible(true);
    setTimeout(() => {
      setTimerSwitchedMessageVisible(false);
    }, 1000)
  };

  const handleStart = () => {
    if (inputValue !== '') {
      const timeInMinutes = parseFloat(inputValue);
      const timeInSeconds = timeInMinutes * 60;
      
      if (currentTimer === 1) {
        clearInterval(firstTimer!);
        setFirstTimer(null);
        setFirstTimerTime(timeInSeconds);
        setCurrentTimer(1);
        setFirstTimer(setInterval(() => {
          setFirstTimerTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 1000));
      } else {
        clearInterval(secondTimer!);
        setSecondTimer(null);
        setSecondTimerTime(timeInSeconds);
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
      localStorage.clear();
    }
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStart();
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

  useEffect(() => {
    const firstTimerStore = localStorage.getItem('timer1Time');
    const secondTimerStroe = localStorage.getItem('timer2Time');
    const currentTimerStore = localStorage.getItem('currentTimer');
    if (firstTimerStore !== null) setFirstTimerTime(Number(firstTimerStore));
    if (secondTimerStroe !== null) setSecondTimerTime(Number(secondTimerStroe));
    if (currentTimerStore !== null) setCurrentTimer(Number(currentTimerStore));
  }, []);

  useEffect(() => {
    if (firstTimerTime !== null) localStorage.setItem('timer1Time', firstTimerTime.toString());
    if (secondTimerTime !== null) localStorage.setItem('timer2Time', secondTimerTime.toString());
    localStorage.setItem('currentTimer', currentTimer.toString());
  }, [firstTimerTime, secondTimerTime, currentTimer]);

  return (
    <div className={styles.timeManager}>
      <div className={styles.timeManager__inputWrapper}>
        <input
          type="number"
          name="time"
          id="time"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.timeManager__input}
          placeholder="Введите время в минутах"
          onKeyDown={handleEnterPress}
        />
      </div>
      {timerSwitchedMessageVisible &&
        <div className={styles.timeManager__alert}>
          {currentTimer === 1 ? 'Первый таймер включен' : 'Второй таймер включен'}
        </div>}
      {currentTimer === 1 && firstTimerTime !== null && <Timer time={firstTimerTime} isPaused={isPaused} />}
      {currentTimer === 2 && secondTimerTime !== null && <Timer time={secondTimerTime} isPaused={isPaused} />}
      {(firstTimerTime === null && secondTimerTime === null) &&
        <div className={styles.timeManager__infoText}>
          В поле ввода введите минуты для отсчета и нажмите кнопку "Старт/Cтоп" для запуска таймера
        </div>
      }
      <div className={styles.timeManager__buttons}>
        <Button
          text="Пауза/Продолжить"
          handleClick={handlePause}
        />
        <Button
          text="Старт/Стоп"
          handleClick={handleStart}
        />
        <Button
          text="Переключить таймер"
          handleClick={handleSwitchTimer}
        />
      </div>
    </div>
  );
}

export default TimeManager;
