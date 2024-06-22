import React from 'react';
import { useTranslation } from 'react-i18next';
import './CV.less';

const CV: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="CV">
      <h2>{t('cv.education')}</h2>
      <div className="section">
        <h3>{t('cv.hkust')}</h3>
        <p>2018~2019</p>
        <p>Master of Science in Information Technology</p>
        <p>Straight A w/ CPA 4.12</p>
      </div>
      <div className="section">
        <h3>{t('cv.sysu')}</h3>
        <p>2014~2018</p>
        <p>Bachelor of Engineering in Digital Media Software Engineering</p>
        <p>Top 10% w/ GPA 3.?</p>
      </div>
      <h2>{t('cv.workExperience')}</h2>
      <div className="section">
        <h3>{t('cv.sensetime')}</h3>
        <p>2019~Present</p>
        <p>Senior AI Engineer</p>
        <p>Involved in various projects related to computer vision and deep learning.</p>
      </div>
    </div>
  );
}

export default CV;
