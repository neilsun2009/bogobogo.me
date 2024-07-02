import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.less';
import { AnimatePresence, motion } from 'framer-motion';
import SubpageProps from '../utils/SubpageProps';
import projectsConfig from '../configs/projects.json';
import { CloseCircleFilled, ExportOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Projects: React.FC<SubpageProps> = ({ color }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [showZoomedCarousel, setShowZoomedCarousel] = useState(false);
  const [currentImageList, setCurrentImageList] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClickImage = (imageList: string[], index: number) => {
    setCurrentImageList(imageList);
    setCurrentImageIndex(index);
    setShowZoomedCarousel(true);
  };

  const renderProjectsSection = (
        name: string, 
        index: number,
        sectionCfg: {name: string, link?: string, images: string[]}[],
    ) => {
    const baseDelay = 1 + 0.2 * index;
    return (
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.5 }}
        >
          <h2>{t(`projects.${name}`)}</h2>
          <div className='sectionCtn'>
            {sectionCfg.map((item, itemIdx) => (
              <div 
                className='item' 
                key={itemIdx} 
              >
                <div className="sliderCtn">
                  <Carousel 
                    showThumbs={false} 
                    showStatus={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={5000 + 100 * itemIdx}
                    swipeable={true}
                  >
                    {item.images.map((image, imageIdx, imageList) => (
                      <div key={imageIdx} className="imageCtn"
                        onClick={() => handleClickImage(imageList, imageIdx)}
                      >
                        <div className="itemBg"
                          style={{
                            backgroundImage: `url(${image})`,
                          }}
                        ></div>
                        <div className='zoom'><ZoomInOutlined /></div>
                      </div>
                    ))}
                  </Carousel>
                  
                </div>
                <div className="detail">
                  <div className='title'>
                    {t(`projects.projectDetails.${item.name}.title`)}
                  </div>
                  <div className='desc'>
                    {t(`projects.projectDetails.${item.name}.desc`)}
                  </div>
                  {item.link && (
                    <a className='link' target='_blank' rel="noreferrer" href={item.link}
                      style={{
                        // color: color,
                      }}
                    >
                      <ExportOutlined /> {t(`projects.link`)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
  }

  return (
    <div className="projects">
      <motion.h1
        className='subpageH1'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0}}
        transition={{ delay: 0, duration: 1 }}
        style={{
          fontWeight: lang === 'zh' ? 700 : 500,
          margin: lang === 'zh' ? '20px 0' : '0',
        }}
      >
        {/* <motion.span 
          className="highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0, duration: 0.5 }}
        > */}
          {t('header.projects')}
          <motion.div
            className="bar"
            style={{ 
              background: color,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
        {/* </motion.span> */}
      </motion.h1>
      {renderProjectsSection('current', 0, projectsConfig.current)}
      {renderProjectsSection('past', 0, projectsConfig.past)}
      <AnimatePresence>
        {showZoomedCarousel && (
          <motion.div className="zoomedCarouselBackdrop"
            initial={{ opacity: 0, scale: 0.5}}
            animate={{ opacity: 1, scale: 1}}
            exit={{ opacity: 0, scale: 0.5}}
            transition={{ duration: 0.3}}
          >
            <button className="closeButton" onClick={() => setShowZoomedCarousel(false)}><CloseCircleFilled /></button>
            <div className='slideCtn'>
              <Carousel 
                showThumbs={true} 
                showStatus={false}
                infiniteLoop={true}
                selectedItem={currentImageIndex}
                swipeable={true}
              >
                {currentImageList.map((image, imageIdx) => (
                  <div key={imageIdx} className="imageCtn">
                    <img src={image} alt="" />
                  </div>
                ))}
              </Carousel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
