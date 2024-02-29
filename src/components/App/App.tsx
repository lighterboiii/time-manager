import React from 'react';
import styles from './App.module.scss';
import Timer from '../Timer/Timer';

function App() {
  return (
    <div className={styles.app}>
      <Timer />
    </div>
  );
}

export default App;
