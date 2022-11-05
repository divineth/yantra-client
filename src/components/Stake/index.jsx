import React, { useEffect } from "react";
import { useAPRPercentage } from "../../hooks/stake/useAPRPercentage";
import { useTotalStaked } from "../../hooks/stake/useTotalStaked";
import DocuBox from "../DocuBox";
import StakeWidget from "../StakeWidget";
import TotalPyroBox from "../TotalPyroBox";
import style from "./stake.module.css";

const Stake = () => {

  const totalStaked = useTotalStaked();
  const APRPercentage = useAPRPercentage();

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.content__left}>
            <StakeWidget />
          </div>
          <div className={style.content__right}>
            <TotalPyroBox totalTokens={totalStaked} />
            <DocuBox apr={APRPercentage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stake;
