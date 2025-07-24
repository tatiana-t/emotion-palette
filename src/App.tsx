import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SegmentedRadioGroup } from '@gravity-ui/uikit';
import CreatePage from 'src/pages/create';
import HistoryPage from 'src/pages/history';
import './App.scss';

function App() {
  const [currentSection, setCurrentSection] = useState('/');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentSection === '/') {
      navigate('/');
    } else {
      navigate('/history');
    }
  }, [currentSection]);

  const updateSection = () => {
    if (location.pathname !== currentSection) {
      setCurrentSection(location.pathname);
    }
  };
  useEffect(() => {
    updateSection();
  }, [location]);

  useEffect(() => {
    updateSection();
  }, []);

  const onUpdate = (value: string) => {
    setCurrentSection(value);
  };

  return (
    <div className="app">
      <div className="app__navigator">
        <SegmentedRadioGroup onUpdate={onUpdate} value={currentSection}>
          <SegmentedRadioGroup.Option value="/">Добавить</SegmentedRadioGroup.Option>
          <SegmentedRadioGroup.Option value="/history">История</SegmentedRadioGroup.Option>
        </SegmentedRadioGroup>
      </div>
      <Routes>
        <Route index element={<CreatePage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
