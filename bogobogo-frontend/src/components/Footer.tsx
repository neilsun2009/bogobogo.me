import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.less';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      <p>© Copyright Bogo 2016~{currentYear}. All rights reserved.</p>
      <p>
        <img
          src="https://flagcdn.com/16x12/me.png"
          srcSet="https://flagcdn.com/32x24/me.png 2x,
            https://flagcdn.com/48x36/me.png 3x"
          width="16"
          height="12"
          alt="Montenegro"/>&nbsp;
        {t('footer.shoutout')}
      </p>
    </footer>
  );
}

export default Footer;
