import { useEffect, useState } from 'react';
import styles from './App.module.css';
import AppContainer from './components/appContainer';
import { ModalType } from './util/types';

function App() {

  const [modalState, setModalState] = useState<ModalType>("CLOSE");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", modalState !== "CLOSE");
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [modalState])

  return (
    <>
      <div className={`${styles["app"]} ${modalState !== "CLOSE" && styles["modal-open"]} `}>
        <header className={styles["app-header"]}>
          <h1>Device list</h1>
        </header>
        <AppContainer setModalState={setModalState} modalState={modalState} />
      </div>
    </>
  );
}

export default App;
