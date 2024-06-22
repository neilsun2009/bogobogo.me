import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CV from './CV';
import Projects from './Projects';
import './HomePage.less';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  console.log(t);
  console.log(i18n);
  
  const subtitles = [
    t('subtitle.engineer'),
    t('subtitle.developer'),
    t('subtitle.researcher')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [subtitles.length]);

  const handleLeftArrowClick = () => {
    setCurrentSubtitleIndex((prevIndex) => (prevIndex - 1 + subtitles.length) % subtitles.length);
  };

  const handleRightArrowClick = () => {
    setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
  };

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="HomePage">
      {currentPage === 'home' ? (
        <div className="content">
          <h1>
            Hi! <br /> {t('intro.myName')} <span className="highlight">Bogo</span>.
          </h1>
          <p className="subtitle">{subtitles[currentSubtitleIndex]}</p>
          <div className="arrows">
            <button onClick={handleLeftArrowClick}>&lt;&lt;</button>
            <button onClick={handleRightArrowClick}>&gt;&gt;</button>
          </div>
          <div className="links">
            <button onClick={() => handleLinkClick('cv')}>{t('header.cv')}</button>
            <button onClick={() => handleLinkClick('projects')}>{t('header.projects')}</button>
          </div>
        </div>
      ) : currentPage === 'cv' ? (
        <CV />
      ) : (
        <Projects />
      )}
      <div className="language-switcher">
        <button onClick={() => handleLanguageChange('en')}>EN</button>
        <button onClick={() => handleLanguageChange('zh')}>中文</button>
      </div>
    </div>
  );
}

export default HomePage;
