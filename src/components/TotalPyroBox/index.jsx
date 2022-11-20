import React from "react";
import style from "./total-box.module.css";
import YantraSymbol from "../../assets/images/yantra-symbol.svg";
import { formatUnits } from "ethers/lib/utils";
import { genFormatter, parseDecimals } from "../../utils/utils";
import { useYantraDapp } from "../../providers/YantraProvider/YantraDappProvider";
import Image from "next/image";

const TotalPyroBox = ({ totalTokens }) => {
  const { prices } = useYantraDapp();

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>Total $YANTRA Staked By All Holders</h2>
        </div>
        <div className={style.info__value}>
          <Image src={YantraSymbol.src} alt="" width={28} height={28} />
          <p>{totalTokens ? parseDecimals(totalTokens, 2) : "-"}</p>
        </div>
        <div className={style.usdt_value}>
          USDT Value: $
          {prices?.ethValue
            ? (
                (totalTokens * prices?.ethValue * prices?.usdtValue) /
                10 ** 18
              ).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
};

export default TotalPyroBox;
