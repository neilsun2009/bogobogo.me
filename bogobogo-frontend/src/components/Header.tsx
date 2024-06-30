import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.less';
import { GithubFilled, InstagramFilled, LinkedinFilled, PictureFilled, WechatFilled } from '@ant-design/icons';
import qrcode from '../assets/wechat-qrcode.bmp';

// interface HeaderProps {
//   setCurrentPage: (page: string) => void;
// }

const Header: React.FC = ({ }) => {
  const { t, i18n } = useTranslation();
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
      <div className="language-switcher" title={t("link.lang")}>
        {currentLanguage === 'en' && <button onClick={() => changeLanguage('zh')}>中文</button>}
        {currentLanguage === 'zh' && <button onClick={() => changeLanguage('en')}>EN</button>}        
      </div>
      <div className='links'>
        <span title={t("link.linkedin")}>
            <a href='https://www.linkedin.com/in/zhanbo-sun-1ba7b1212/' rel='noreferrer' target='_blank'><LinkedinFilled /></a>
        </span>
        <span title={t("link.git")}>
            <a href='https://github.com/neilsun2009' rel='noreferrer' target='_blank'><GithubFilled /></a>
        </span>
        <span title={t("link.wechat")}>
            <WechatFilled onClick={() => setShowQR(!showQR)} />
            <div
              className={showQR ? 'qrcode': 'qrcode hide'}
            >
                <img src={qrcode} alt="Wechat QR Code" />
            </div>
        </span>
        <span title={t("link.gallery")}>
            <a href='https://imgur.com/user/neilsun2009/posts' rel='noreferrer' target='_blank'><PictureFilled /></a>    
        </span>
        <span title={t("link.ins")}>
            <a href='https://www.instagram.com/neilsun2009/' rel='noreferrer' target='_blank'><InstagramFilled /></a>    
        </span>
      </div>
    </header>
  );
}

export default Header;
