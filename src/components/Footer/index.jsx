import React from "react";
import style from "./footer.module.css";
import Telegram from "../../assets/images/yantra-tg.svg";
import Twitter from "../../assets/images/yantra-twitter.svg";

const Footer = () => {
  return (
    <div className={style.footer__container}>
      <div className={style.footer__content}>
        <div className={style.footer__left}>
          <h3>$YANTRA 2022 All rights reserved.</h3>
          <p>Built by Embrace Tech</p>
        </div>
        <div className={style.footer__right}>
          <div className={style.socials}>
            <a href="https://t.me/YANTRAPortal" target="_blank" rel="noreferrer">
              <img src={Telegram.src} alt="" />
            </a>
            <a href="https://twitter.com/YANTRA999" target="_blank" rel="noreferrer">
              <img src={Twitter.src} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
