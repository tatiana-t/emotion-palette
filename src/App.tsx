import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import MainMenu from 'src/components/mainMenu';
import CreatePage from 'src/pages/create';
import HistoryPage from 'src/pages/history';
import DetailPage from 'src/pages/detail';
import AboutPage from 'src/pages/about';
import { useDataStore } from 'src/storage';

import { setColorsCssVars } from 'src/helpers/setColorsCssVars';
import './App.scss';

function App() {
  const selectedColor = useDataStore((state) => state.today.color);
  const colorItem = useDataStore((state) => state.currentColor);

  useEffect(() => {
    const color = selectedColor || colorItem?.color;
    setColorsCssVars(color);
  }, [selectedColor, colorItem?.color]);

  return (
    <div className="app">
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
