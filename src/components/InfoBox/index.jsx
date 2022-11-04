import React from "react";
import style from "./info-box.module.css";
import Info1 from "../../assets/images/info_one.svg";
import YantraSymbol from "../../assets/images/yantra-symbol.svg";

const InfoBox = ({title}) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <p>{title}</p>
          <img src={Info1.src} alt="" />
        </div>
        <div className={style.info__value}>
          <div className="flex gap-2">
            <img src={YantraSymbol.src} alt="" />
            <p>$YANTRA</p>
          </div>
          <p>100</p>
        </div>
        <div className={style.usdt_value}>USDT Value: $0,000.00</div>
      </div>
    </div>
  );
};

export default InfoBox;
