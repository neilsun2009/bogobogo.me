import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CV from './CV';
import Projects from './Projects';
import './HomePage.less';
import subtitleList from '../configs/subtitles.json';

import bg0 from '../assets/bg-1.jpg';
import bg1 from '../assets/bg-2.jpg';
import bg2 from '../assets/bg-3.jpg';
import { FileDoneOutlined, ProductOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const changeSubtitleTimeout = 5000;

  const pageComponentMap: Record<string, React.ReactNode> = {
    cv: <CV />,
    projects: <Projects />,
  }

  const subtitleIdxBgMap: Record<number, string> = {
    0: bg0,
    1: bg1,
    2: bg2,
  }

  const curSubtitle = subtitleList[currentSubtitleIndex];

  const changeSubtitle = (increment = 1) => {
    setCurrentSubtitleIndex((prevIndex) => (prevIndex + increment + subtitleList.length) % subtitleList.length);
  if (timeoutId.current) clearTimeout(timeoutId.current);
  timeoutId.current = setTimeout(() => changeSubtitle(), changeSubtitleTimeout);
  };

  useEffect(() => {
    changeSubtitle();
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [subtitleList.length]);

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
  };

  const accentColorBgStr = `linear-gradient(to bottom, transparent 50%, ${curSubtitle.color} 50%)`;

  const getLinksBySubtitleIdx = (idx: number) => {
    switch (idx) {
      case 0: return (
        <>
          <button onClick={() => handleLinkClick('cv')}><FileDoneOutlined /> {t('header.cv')}</button>
          <button onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</button>
        </>
      );
      default:
        return null;
    }
  }

  return (
    <div className="HomePage">
      <div className='white'>
        {currentPage !== 'home' && pageComponentMap[currentPage]}
      </div>
      <div className='bg' style={{ backgroundImage: `url(${subtitleIdxBgMap[currentSubtitleIndex]})` }}>

      </div>
      {currentPage === 'home' && (
        <div className="homeContent">
          <h2>Hi!</h2>
          <h1>
            {t('intro.myName')} <span className="highlight" style={{background: accentColorBgStr}}>Bogo</span>.
          </h1>
          <p className='subtitleContainer'>
            <span className='subtitle'>
              {t(curSubtitle.subtitleKey).split('*').map((text, index) => 
                index % 2 === 0 ? 
                  <span>{text}</span> : 
                  <span key={index} className="highlight" style={{background: accentColorBgStr}}>{text}</span>
              )}
            </span>
          </p>
          <span className="arrows">
            <button onClick={() => changeSubtitle(-1)}>&lt;&lt;</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => changeSubtitle(1)}>&gt;&gt;</button>
          </span>
          <div className="links">
            {getLinksBySubtitleIdx(currentSubtitleIndex)}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
