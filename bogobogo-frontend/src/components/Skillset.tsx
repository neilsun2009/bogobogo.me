import React from 'react';
import { useTranslation } from 'react-i18next';
import './Skillset.less';
import { motion } from 'framer-motion';
import SubpageProps from '../utils/SubpageProps';
import cvConfig from '../configs/cv.json';
import { EnvironmentOutlined } from '@ant-design/icons';

const Skillset: React.FC<SubpageProps> = ({ color }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="skillset">
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
          {t('header.skillset')}
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
      {/* basic info */}
      <motion.div
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3>{t('cv.name')}</h3>
        <p><EnvironmentOutlined /> {t('cv.base')}</p>
      </motion.div>
      {/* education */}
      <motion.h2
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {t('cv.edu')}
      </motion.h2>
      {/* <h2>{t('cv.edu')}</h2> */}
      {cvConfig.eduExp.map((edu, index) => (
        <motion.div
          key={index}
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + 0.2 * index, duration: 0.5 }}
        >
          <div className='periodCtn'>
            <h3>{t(`cv.eduExp.${edu}.name`)}</h3>
            <p className='big'>{t(`cv.eduExp.${edu}.period`)}</p>
          </div>
          <p>{t(`cv.eduExp.${edu}.degree`)}</p>
          <p 
            className='detail' 
            style={{
              fontSize: lang === 'zh' ? '1em' : '1.2em',
            }}
          >
            {t(`cv.eduExp.${edu}.detail`)}
          </p>
        </motion.div>
      ))}
      {/* work experience */}
      <motion.h2
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 + 0.2 * cvConfig.eduExp.length, duration: 0.5 }}
      >
        {t('cv.work')}
      </motion.h2>
      {cvConfig.workExp.map((work, index) => (
        <motion.div
          key={index}
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + 0.2 * cvConfig.eduExp.length + 0.2 + 0.2 * index, duration: 0.5 }}
        >
          <div className='periodCtn'>
            <h3>{t(`cv.workExp.${work.company}.name`)}</h3>
            <p className='big'>{t(`cv.workExp.${work.company}.period`)}</p>
          </div>
          {Array.from({ length: work.posNum }, (_, posIndex) => (<div key={posIndex}>
            <div className='periodCtn'>
              <p>{t(`cv.workExp.${work.company}.pos${posIndex+1}.title`)}</p>
              { work.posNum > 1 && <p>{t(`cv.workExp.${work.company}.pos${posIndex+1}.period`)}</p>}
              
            </div>
            <p 
              className='detail' 
              style={{
                fontSize: lang === 'zh' ? '1em' : '1.2em',
              }}
            >
              {t(`cv.workExp.${work.company}.pos${posIndex+1}.detail`)}
            </p>
          </div>))}
        </motion.div>
      ))}
    </div>
  );
}

export default Skillset;
