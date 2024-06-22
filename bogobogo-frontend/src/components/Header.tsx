import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.less';

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="Header">
      <nav>
        <button onClick={() => setCurrentPage('home')}>{t('header.home')}</button>
        <button onClick={() => setCurrentPage('cv')}>{t('header.cv')}</button>
        <button onClick={() => setCurrentPage('projects')}>{t('header.projects')}</button>
      </nav>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('zh')}>中文</button>
      </div>
    </header>
  );
}

export default Header;
