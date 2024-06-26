import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CV from './CV';
import Projects from './Projects';
import './HomePage.less';
import subtitleList from '../configs/subtitles.json';
import { FileDoneOutlined, GithubOutlined, InstagramOutlined, LeftCircleFilled, MailOutlined, PictureOutlined, ProductOutlined, RightCircleFilled, ScheduleOutlined, SwapLeftOutlined, WechatOutlined } from '@ant-design/icons';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useMouse } from 'react-use';
import wechatQrcode from '../assets/wechat-qrcode.bmp';
import Skillset from './Skillset';
import Gallery from './Gallery';

// Create a cache object outside of your component
const imageCache: { [key: string]: string } = {};

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [showWechatQR, setShowWechatQR] = useState(false);
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
    if (currentPage !== 'home') return;
    changeSubtitle(0);
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [currentPage]);

  const pageComponentMap: Record<string, React.ReactNode> = {
    cv: <CV color={curSubtitle.color}/>,
    skillset: <Skillset color={curSubtitle.color}/>,
    gallery: <Gallery color={curSubtitle.color}/>,
    projects: <Projects color={curSubtitle.color}/>,
  }

  const handleLinkClick = (page: string) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setCurrentPage(page);
  };

  const getLinksBySubtitleIdx = (idx: number) => {
    switch (idx) {
      case 0: return (
        <>
          <a className='linkBtn' onClick={() => handleLinkClick('cv')}><FileDoneOutlined /> {t('header.cv')}</a>
          <a className='linkBtn' onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</a>
        </>
      );
      case 1: return (
        <>
          <a className='linkBtn' onClick={() => handleLinkClick('projects')}><ProductOutlined /> {t('header.projects')}</a>
          <a className='linkBtn' onClick={() => handleLinkClick('skillset')}><ScheduleOutlined /> {t('header.skillset')}</a>
          <a href='https://github.com/neilsun2009' className='linkBtn' target='_blank'><GithubOutlined /> {t('header.git')}</a>
        </>
      );
      case 2: return (
        <>
          <div className='wechatQrCtn'>
            <a className='linkBtn' onClick={() => setShowWechatQR(!showWechatQR)}><WechatOutlined /> {t('header.wechat')}</a>
            <div
              className={showWechatQR ? 'qrcode': 'qrcode hide'}
            >
              <img src={wechatQrcode} alt="Wechat QR Code" />
            </div>
          </div>
        </>
      );
      case 3: return (
        <>
          <a className='linkBtn' onClick={() => handleLinkClick('gallery')}><PictureOutlined /> {t('header.gallery')}</a>
          <a href='https://www.instagram.com/neilsun2009/' className='linkBtn' target='_blank'><InstagramOutlined /> {t('header.ins')}</a>
        </>
      );
      case 4: return (
        <>
          <a href="mailto:neilsun2009@163.com" className='linkBtn' target='_blank' rel='noreferrer'><MailOutlined /> {t('header.email')}</a>
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

  // background image loading
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const imgSrc = windowWidth <= 480 ? curSubtitle.bgVertical : curSubtitle.bg;
    // If the image is already in the cache, use it
    if (imageCache[imgSrc]) {
      setLoadedBg(imageCache[imgSrc]);
    } else {
      // Otherwise, load the image and add it to the cache
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        imageCache[imgSrc] = img.src;
        setLoadedBg(img.src);
      };
      // Otherwise, fetch the image, convert it to base64, and add it to the cache
      // fetch(imgSrc)
      //   .then(response => response.blob())
      //   .then(blob => {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       imageCache[imgSrc] = base64data as string;
      //       setLoadedBg(base64data as string);
      //     };
      //     reader.readAsDataURL(blob);
      //   });
    }
  }, [curSubtitle.bg, windowWidth]);

  // background tracking
  const [loadedBg, setLoadedBg] = useState('');
  const mouseRef = React.useRef(null);
  const { docX, docY } = useMouse(mouseRef);
  // const [orientation, setOrientation] = useState({ alpha: 0, beta: 0 });

  // for mouse
  const motionDocX = useMotionValue(docX);
  const motionDocY = useMotionValue(docY);

  useEffect(() => {
    motionDocX.set(docX);
    motionDocY.set(docY);
  }, [docX, docY]);
  
  const x = useTransform(motionDocX, [0, window.innerWidth], ['2.5%', '-2.5%']);
  const y = useTransform(motionDocY, [0, window.innerHeight], ['2.5%', '-2.5%']);
  
  const normalize = (value: number, min: number, max: number, newMin: number, newMax: number) => {
    const newValue = Math.min(Math.max(value, min), max);
    return ((newValue - min) / (max - min)) * (newMax - newMin) + newMin;
  };

  // for mobile
  const isMobileDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;
    const normalizedGamma = normalize(gamma, -90, 90, 2.5, -2.5);
    const normalizedBeta = normalize(beta, -180, 180, -2.5, 2.5);
    x.set(`${normalizedGamma}%`);
    y.set(`${normalizedBeta}%`);
  };

  const [isOrientationEventBound, setIsOrientationEventBound] = useState(false);

  const requestOrientationPermission = () => {
    if (!isOrientationEventBound && typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: PermissionState) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            setIsOrientationEventBound(true);
          }
        })
        .catch(console.error);
    } else if (!isOrientationEventBound) {
      // non iOS 13+
      window.addEventListener('deviceorientation', handleOrientation);
      setIsOrientationEventBound(true);
    }
  };

  useEffect(() => {
    // Check if permission is required
    if (!isOrientationEventBound && typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      navigator.permissions.query({ name: 'deviceorientation' as PermissionName }).then((result) => {
        if (result.state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setIsOrientationEventBound(true);
        }
      });
    } else if (!isOrientationEventBound) {
      // non iOS 13+
      window.addEventListener('deviceorientation', handleOrientation);
      setIsOrientationEventBound(true);
    }
  }, [isOrientationEventBound]);

  return (<>{pageVisible && (
    <div className="HomePage">
      <div className={currentPage === 'home' ? 'white' : 'white subpage'}>
        {currentPage !== 'home' && <>
          <button className='linkBtn' onClick={() => handleLinkClick('home')}><SwapLeftOutlined /> Back</button>
          <div className='content'>
            {pageComponentMap[currentPage]}
          </div>
        </>}
      </div>
      <AnimatePresence mode='wait'>
        <motion.div 
          className={currentPage === 'home' ? 'bgWrapper' : 'bgWrapper subpage'}
          key={currentSubtitleIndex}
          initial="initial"
          animate="in"
          exit="out"
          variants={bgVariants}
          onClick={requestOrientationPermission}
          // transition={bgTransition}
        >
          <motion.div 
            ref={mouseRef}
            className='bg' 
            style={{ 
              backgroundImage: `url(${loadedBg})`,
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
            style={{
              fontWeight: lang === 'zh' ? 700 : 500,
              margin: lang === 'zh' ? '20px 0' : '0',
            }}
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
                  // fontWeight: lang === 'zh' ? 600 : 'normal',
                  // lineHeight: lang === 'zh' ? '1.5' : '2rem',
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
                          height: lang === 'zh' ? '80%' : '50%',
                          bottom: lang === 'zh' ? '-4px' : '0',
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
            style={{
              // fontWeight: lang === 'zh' ? 700 : 'normal',
            }}
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
