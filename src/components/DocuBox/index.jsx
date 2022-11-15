import React from "react";
import style from "./docu-box.module.css";
import ExternalLink from "../../assets/images/external-link.svg";
import { formatUnits } from "ethers/lib/utils";
import Image from "next/image";

const DocuBox = ({ apr }) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <p className={style.info__title}>More Info</p>
          <a
            href="https://etherscan.io/token/0xd55231b619Ec464347d7b6eB12Cc7AE19fBbf37D"
            target="_blank"
            rel="noreferrer"
            className={style.info__link}
          >
            View Yantra on Etherscan
            <Image
              src={ExternalLink.src}
              alt="External link icon"
              width={16}
              height={16}
            />
          </a>
        </div>
        <div className={style.info__body}>
          <div className={style.body__content}>
            <p>Yantra Staking Instructions</p>
            <a
              href="https://yantra999.com"
              target="_blank"
              rel="noreferrer"
              className={style.info__link}
            >
              View Instructions
              <Image
                src={ExternalLink.src}
                className="w-5"
                alt="External link icon"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className={style.body__content}>
            <p>Yantra APR</p>
            <div className={style.apr}>
              {apr
                ? `${formatUnits(apr?.percentage, 0)}.${formatUnits(
                    apr?.decimals,
                    0
                  )}%`
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocuBox;
