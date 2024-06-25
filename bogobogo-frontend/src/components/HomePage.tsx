import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CV from './CV';
import Projects from './Projects';
import './HomePage.less';
import subtitleList from '../configs/subtitles.json';
import { FileDoneOutlined, LeftCircleFilled, ProductOutlined, RightCircleFilled } from '@ant-design/icons';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useMouse } from 'react-use';

import bg0 from '../assets/bg-1.jpg';
import bg1 from '../assets/bg-2.jpg';
import bg2 from '../assets/bg-3.jpg';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const lang = i18n.language;
  
  // making page always visible, so that subtitle changes are not paused by browser optimization
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // changing subtitle
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const curSubtitle = subtitleList[currentSubtitleIndex];
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const changeSubtitleTimeout = 10000;

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
  }, []);

  const pageComponentMap: Record<string, React.ReactNode> = {
    cv: <CV />,
    projects: <Projects />,
  }

  const subtitleIdxBgMap: Record<number, string> = {
    0: bg0,
    1: bg1,
    2: bg2,
  }

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
  };

  const getLinksBySubtitleIdx = (idx: number) => {
    switch (idx) {
      case 0: return (
        <>
          <button onClick={() => handleLinkClick('cv')}><FileDoneOutlined /> {t('header.cv')}</button>
          <button onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</button>
        </>
      );
      case 1: return (
        <>
          <button onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</button>
        </>
      );
      case 2: return (
        <>
          <button onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</button>
        </>
      );
      default:
        return null;
    }
  }

  // animation related
  const bgVariants = {
    initial: { y: '-100%', opacity: 0 },
    in: { y: 0, x: 0, opacity: 1, transition: { duration: 1 } },
    out: { y: "50%", opacity: 0, transition: { duration: 0.5 }},
  };

  const subtitleVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.8 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.3 } }
  };

  // background tracking
  const mouseRef = React.useRef(null);
  const { docX, docY } = useMouse(mouseRef);
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0 });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({ alpha: event.alpha || 0, beta: event.beta || 0 });
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const motionDocX = useMotionValue(docX);
  const motionDocY = useMotionValue(docY);

  const x = useTransform(motionDocX, [0, window.innerWidth], ['2.5%', '-2.5%']);
  const y = useTransform(motionDocY, [0, window.innerHeight], ['-2.5%', '2.5%']);

  const normalize = (value: number, min: number, max: number, newMin: number, newMax: number) => {
    return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
  };

  useEffect(() => {
    motionDocX.set(docX);
    motionDocY.set(docY);

    // Check if it's a mobile device
    if ('ontouchstart' in window) {
      const normalizedAlpha = normalize(orientation.alpha || 0, 0, 360, -2.5, 2.5);
      const normalizedBeta = normalize(orientation.beta || 0, -180, 180, -2.5, 2.5);
      x.set(`${normalizedAlpha}%`);
      y.set(`${normalizedBeta}%`);
    }
  }, [docX, docY, orientation.alpha, orientation.beta]);

  return (<>{pageVisible && (
    <div className="HomePage">
      <div className='white'>
        {currentPage !== 'home' && pageComponentMap[currentPage]}
      </div>
      <AnimatePresence mode='wait'>
        <motion.div 
          className='bgWrapper'
          key={currentSubtitleIndex}
          initial="initial"
          animate="in"
          exit="out"
          variants={bgVariants}
          // transition={bgTransition}
        >
          <motion.div 
            ref={mouseRef}
            className='bg' 
            style={{ 
              backgroundImage: `url(${subtitleIdxBgMap[currentSubtitleIndex]})`,
              backgroundPosition: 'center',
              // transform: `translate(${x}, ${y})`,
              x,
              y,
            }}
          >
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {currentPage === 'home' && (
        <div className="homeContent">
          <motion.h2
            initial={{ opacity: 0, y: -50}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.2, duration: 0.5}}
          >
            Hi!
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.5, duration: 1 }}
            style={{fontWeight: lang === 'zh' ? 700 : 500}}
          >
            {t('intro.myName')} 
            {lang === 'en' && ' '}
            <motion.span 
              className="highlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Bogo
              <motion.div
                className="bar"
                style={{ 
                  background: curSubtitle.color,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              />
            </motion.span>
          </motion.h1>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSubtitleIndex}
              className='subtitleContainer'
              variants={subtitleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className='subtitle'
                style={{ 
                  background: lang === 'zh' ? 'linear-gradient(to bottom, transparent 20%, #fff 20%, #fff 90%, transparent 90%)' : 
                    'linear-gradient(to bottom, transparent 40%, #fff 40%, #fff 80%, transparent 80%)',
                  fontWeight: lang === 'zh' ? 600 : 'normal',
                }}
              >
                {t(curSubtitle.subtitleKey).split('*').map((text, index) => 
                  index % 2 === 0 ? 
                    <span key={index}>{text}</span> : 
                    <span key={index} className="highlight">
                      {text}
                      <motion.div
                        className="bar"
                        style={{ 
                          background: curSubtitle.color,
                          height: lang === 'zh' ? '90%' : '50%',
                          bottom: lang === 'zh' ? '-8px' : '-2px',
                        }}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.8 + index * 0.3, duration: 0.8 }}
                      />
                    </span>
                )}
              </span>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="links"
            key={currentSubtitleIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {getLinksBySubtitleIdx(currentSubtitleIndex)}
          </motion.div>
          <motion.span
            className="arrows"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <span onClick={() => changeSubtitle(-1)}><LeftCircleFilled /></span>
            <span onClick={() => changeSubtitle(1)}><RightCircleFilled /></span>
          </motion.span>
        </div>
      )}
    </div>
  )}</>);
}

export default HomePage;
