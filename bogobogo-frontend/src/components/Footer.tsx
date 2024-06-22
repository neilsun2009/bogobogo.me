import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.less';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="Footer">
      <p>{t('footer.copyright')}</p>
      <p>{t('footer.shoutout')}</p>
    </footer>
  );
}

export default Footer;
