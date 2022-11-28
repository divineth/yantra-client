import React from "react";
import style from "./footer.module.css";
import Telegram from "../../assets/images/yantra-tg.svg";
import Twitter from "../../assets/images/yantra-twitter.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={style.footer__container}>
      <div className={style.footer__content}>
        <div className={style.footer__left}>
          <h3>$YANTRA 2022 All rights reserved.</h3>
          <p>
            Built by{" "}
            <a
              href="https://t.me/whokilledthedeadsea"
              target="_blank"
              rel="noreferrer"
            >
              Embrace Tech
            </a>
          </p>
        </div>
        <div className={style.footer__right}>
          <div className={style.socials}>
            <a
              href="https://t.me/YANTRAPortal"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={Telegram.src}
                alt="Telegram social icon"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://twitter.com/YANTRA999"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={Twitter.src}
                alt="Twitter social icon"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
