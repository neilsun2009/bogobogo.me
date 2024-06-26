import React, { useEffect, useState } from 'react';
import './App.less';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';
import './i18n';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (i18n.language === 'zh') {
      document.documentElement.style.setProperty('--primary-font', '"Noto Sans SC", serif');
      document.documentElement.style.setProperty('--secondary-font', '"Noto Sans SC", sans-serif');
    } else {
      document.documentElement.style.setProperty('--primary-font', '"EB Garamond", serif');
      document.documentElement.style.setProperty('--secondary-font', '"Caveat", cursive');
    }
  }, [i18n.language]);

  // set eal window.innerHeight
  useEffect(() => {
    const setAppHeight = () => {
      const app = document.querySelector('.App') as HTMLElement;
      if (app) {
        app.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', setAppHeight);
    setAppHeight(); // Set the height at the first render

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      // case 'cv':
      //   return <CV />;
      // case 'projects':
      //   return <Projects />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default App;
