import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerSocials}>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon}>
            <FaGithub />
          </a>
          <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon}>
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className={styles.footerSocialIcon}>
            <FaLinkedin />
          </a>
        </div>
        <div className={styles.footerText}>
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
