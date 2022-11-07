import React from "react";
import style from "./info-box.module.css";
import Info1 from "../../assets/images/info_one.svg";
import YantraSymbol from "../../assets/images/yantra-symbol.svg";
import { usePrice } from "../../hooks/usePrice";
import {
  useEthUSDTContract,
  useYantraEthContract,
} from "../../hooks/useContract";

const InfoBox = ({ title, value = 0, decimalPlaces }) => {
  // const yantraEthContract = useYantraEthContract();
  // const ethUSDTContract = useEthUSDTContract();
  // const ethValue = usePrice(yantraEthContract, false, 18);
  // const usdtValue = usePrice(ethUSDTContract, true, 12);
  const parsedValue = (num) => {
    return (+num).toFixed(decimalPlaces);
  };

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
          <p>{parsedValue(value)}</p>
        </div>
        <div className={style.usdt_value}>
          USDT Value: $
          {false
            ? ((value * ethValue * usdtValue) / 10 ** 18).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
