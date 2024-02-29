import styles from './App.module.scss';
import Timer from '../Timer/Timer';
import { ChangeEvent, FC, useState } from 'react';
import Button from '../../ui/Button/Button';
import { setDelay } from '../../utils/setDelay';

const App: FC = () => {
  const [time, setTime] = useState('');
  const [currentTimer, setCurrentTimer] = useState(false);
  const [isTimerSwitching, setTimerSwitching] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSwitchTimer = async () => {
    setTimerSwitching(!isTimerSwitching);
    await setDelay(1000);
    setCurrentTimer(!currentTimer);
    setTimerSwitching(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.app__inputWrapper}>
        <input
          type="number"
          name="time"
          id="time"
          value={time}
          onChange={handleInputChange}
          className={styles.app__input}
          placeholder="Введите время в минутах"
        />
      </div>
      {isTimerSwitching && <h2 className={styles.app__alert}>
        Активируем таймер номер {currentTimer ? 1 : 2}
        </h2>}
      {currentTimer && <Timer />}
      {!currentTimer && <Timer />}
      <div className={styles.app__buttons}>
        <Button text="Старт/Стоп" handleClick={() => { }} />
        <Button text="Пауза/Продолжить" handleClick={() => { }} />
        <Button text="Переключить таймер" handleClick={handleSwitchTimer} />
      </div>
    </div>
  );
}

export default App;
