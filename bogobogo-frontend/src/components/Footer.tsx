import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.less';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="Footer">
      <p>© Copyright Bogo 2016~{currentYear}. All rights reserved.</p>
      <p><a href="mailto:neilsun2009@163.com">neilsun2009@163.com</a></p>
      <p><a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备17002636号-1</a></p>
    </footer>
  );
}

export default Footer;
