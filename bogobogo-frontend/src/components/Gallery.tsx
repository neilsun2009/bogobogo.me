import React from 'react';
import { useTranslation } from 'react-i18next';
import './Gallery.less';
import { motion } from 'framer-motion';
import SubpageProps from '../utils/SubpageProps';
import galleryConfig from '../configs/gallery.json';
import { CopyOutlined, PlusCircleOutlined } from '@ant-design/icons';

const Gallery: React.FC<SubpageProps> = ({ color }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const renderGallerySection = (
        name: string, 
        index: number,
        sectionCfg: {title: string, link: string, cover: string, count: number}[],
    ) => {
    const baseDelay = 1 + 0.2 * index;
    return (
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.5 }}
        >
          <h2>{t(`gallery.${name}`)}</h2>
          <div className='sectionCtn'>
            {sectionCfg.map((item, itemIdx) => (
              <a 
                className='item' 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                key={itemIdx} 
              >
                <div className="itemBg"
                  style={{
                    backgroundImage: `url(${item.cover})`,
                  }}
                >
                </div>
                <div className='count'><CopyOutlined /> {item.count}</div>
                <div className='title'>
                  {t(`gallery.${name}List.${item.title}`)}
                </div>
              </a>
            ))}
            <a 
              className='item' 
              href='https://www.flickr.com/photos/200975799@N04/albums'
              target="_blank" 
              rel="noreferrer"
            >
              <div className="itemBg"><PlusCircleOutlined /></div>
              <div className='title'>
                {t('gallery.more')}
              </div>
            </a>
          </div>
        </motion.div>
      );
  }

  return (
    <div className="gallery">
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
          {t('header.gallery')}
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
      {renderGallerySection('design', 0, galleryConfig.design)}
      {renderGallerySection('photo', 0, galleryConfig.photo)}
    </div>
  );
}

export default Gallery;
