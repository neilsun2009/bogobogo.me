import React from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.less';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="Projects">
      <h2>{t('header.projects')}</h2>
      <div className="project">
        <h3>Project 1</h3>
        <p>Description of Project 1</p>
      </div>
      <div className="project">
        <h3>Project 2</h3>
        <p>Description of Project 2</p>
      </div>
      <div className="project">
        <h3>Project 3</h3>
        <p>Description of Project 3</p>
      </div>
    </div>
  );
}

export default Projects;
