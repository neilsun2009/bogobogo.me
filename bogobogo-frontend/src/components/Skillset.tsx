import React from 'react';
import { useTranslation } from 'react-i18next';
import './Skillset.less';
import { motion } from 'framer-motion';
import SubpageProps from '../utils/SubpageProps';
import skillConfig from '../configs/skillset.json';

const Skillset: React.FC<SubpageProps> = ({ color }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const renderSkillSection = (
        name: string, 
        index: number,
        sectionCfg: {name: string, level: number}[],
    ) => {
    const baseDelay = 1 + 0.2 * index;
    return (
        <motion.div
          className="section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay, duration: 0.5 }}
        >
          <h2>{t(`skillset.${name}`)}</h2>
          <div className='skillCtn'>
            {sectionCfg.map((skill, skillIdx) => (
              <div key={skillIdx} className='skill'>
                <div className='progress-bar'>
                    <motion.div 
                        className='progress-bar-fill' 
                        style={{ width: `${skill.level}%`, backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: baseDelay + 0.2 * skillIdx, duration: 0.5 }}
                    >
                    </motion.div>
                    <span className='skill-name'>{t(`skillset.${name}List.${skill.name}`)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
  }

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
      {renderSkillSection('programmingLang', 0, skillConfig.programmingLang)}
      {renderSkillSection('ai', 1, skillConfig.ai)}
      {renderSkillSection('softwareDev', 2, skillConfig.softwareDev)}
      {renderSkillSection('lang', 3, skillConfig.lang)}
    </div>
  );
}

export default Skillset;
