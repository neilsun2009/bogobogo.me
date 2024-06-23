import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.less';
import { GithubFilled, InstagramFilled, WechatFilled } from '@ant-design/icons';
import qrcode from '../assets/wechat-qrcode.bmp';

interface HeaderProps {
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => {
  const { i18n } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="Header">
      {/* <nav>
        <button onClick={() => setCurrentPage('home')}>{t('header.home')}</button>
        <button onClick={() => setCurrentPage('cv')}>{t('header.cv')}</button>
        <button onClick={() => setCurrentPage('projects')}>{t('header.projects')}</button>
      </nav> */}
      <div className="language-switcher">
        {currentLanguage === 'en' && <button onClick={() => changeLanguage('zh')}>中文</button>}
        {currentLanguage === 'zh' && <button onClick={() => changeLanguage('en')}>EN</button>}        
      </div>
      <div className='links'>
        <span>
            <a href='https://github.com/neilsun2009' rel='noreferrer' target='_blank'><GithubFilled /></a>
        </span>
        <span>
            <WechatFilled  onClick={() => setShowQR(!showQR)} />
            {showQR && (
                <div className='qrcode'>
                    <img src={qrcode} alt="Wechat QR Code" />
                </div>
            )}
        </span>
        <span>
            <a href='https://www.instagram.com/neilsun2009/' rel='noreferrer' target='_blank'><InstagramFilled /></a>    
        </span>
      </div>
    </header>
  );
}

export default Header;
