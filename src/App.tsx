import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import Navigation from 'src/components/navigation';
import CreatePage from 'src/pages/create';
import HistoryPage from 'src/pages/history';
import About from 'src/pages/about';
import { setHistoryFromDB } from 'src/storage';
import './App.scss';

function App() {
  const [currentSection, setCurrentSection] = useState('/');

  const location = useLocation();

  // useEffect(() => {
  //   if (currentSection === '/') {
  //     navigate('/');
  //   } else {
  //     navigate('/history');
  //   }
  // }, [currentSection]);

  const updateSection = () => {
    if (location.pathname !== currentSection) {
      setCurrentSection(location.pathname);
    }
  };
  useEffect(() => {
    updateSection();
  }, [location]);

  const setHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  useEffect(() => {
    setHeight();
    setHistoryFromDB();
    window.addEventListener('resize', setHeight);

    updateSection();
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  // const onUpdate = (value: string) => {
  //   setCurrentSection(value);
  // };

  return (
    <div className="app theme_dark">
      <div className="app__navigator">
        <Navigation />
      </div>
      <Routes>
        <Route index element={<CreatePage />}></Route>
        <Route path="/history" element={<HistoryPage />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
