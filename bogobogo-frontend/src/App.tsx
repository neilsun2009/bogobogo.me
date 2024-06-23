import React, { useState } from 'react';
import './App.less';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
// import { useTranslation } from 'react-i18next';
import './i18n';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  // const { t } = useTranslation();

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
      <Header setCurrentPage={setCurrentPage} />
      <div className="main-content">{renderPage()}</div>
      <Footer />
    </div>
  );
}

export default App;
