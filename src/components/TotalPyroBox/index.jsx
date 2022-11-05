import React from "react";
import style from "./total-box.module.css";
import YantraSymbol from "../../assets/images/yantra-symbol.svg";
import { formatUnits } from "ethers/lib/utils";

const TotalPyroBox = ({totalTokens}) => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>Total $YANTRA Staked By All Holders</h2>
        </div>
        <div className={style.info__value}>
          <img src={YantraSymbol.src} alt="" />
          <p>{totalTokens ? formatUnits(totalTokens, 18) : "-"}</p>
        </div>
        <div className={style.usdt_value}>USDT Value: $0,000.00</div>
      </div>
    </div>
  );
};

export default TotalPyroBox;
