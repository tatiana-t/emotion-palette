import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import MainMenu from 'src/components/mainMenu';
import CreatePage from 'src/pages/create';
import HistoryPage from 'src/pages/history';
import DetailPage from 'src/pages/detail';
import AboutPage from 'src/pages/about';
import { setHistoryFromDB } from 'src/storage';
import './App.scss';

function App() {
  useEffect(() => {
    setHistoryFromDB();
  }, []);

  return (
    <div className="app theme_dark">
      <div className="app__content">
        <Routes>
          <Route index element={<CreatePage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/history/:id" element={<DetailPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
      </div>

      <MainMenu />
    </div>
  );
}

export default App;
