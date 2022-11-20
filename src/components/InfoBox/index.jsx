import React from "react";
import style from "./info-box.module.css";
import Info1 from "../../assets/images/info_one.svg";
import YantraSymbol from "../../assets/images/yantra-symbol.svg";
import { useYantraDapp } from "../../providers/YantraProvider/YantraDappProvider";
import Image from "next/image";
import { parseDecimals } from "../../utils/utils";

const InfoBox = ({ title, value = 0, decimalPlaces }) => {
  const { prices } = useYantraDapp();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <p>{title}</p>
          <Image src={Info1.src} alt="" width={24} height={24} />
        </div>
        <div className={style.info__value}>
          <div className="flex gap-2">
            <Image src={YantraSymbol.src} alt="" width={28} height={28} />
            <p>$YANTRA</p>
          </div>
          <p>{parseDecimals(value, decimalPlaces)}</p>
        </div>
        <div className={style.usdt_value}>
          USDT Value: $
          {prices?.ethValue
            ? (
                (value * prices?.ethValue * prices?.usdtValue) /
                10 ** 18
              ).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
