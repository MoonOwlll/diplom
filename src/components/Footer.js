import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h5>Ийэ тыл кэрэһитэ</h5>
        <p className="footer-description">
          Веб-проект, посвящённый жизни и творчеству Матвея Петровича Егорова.
        </p>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;