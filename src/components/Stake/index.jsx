import { utils } from "ethers";
import React, { useEffect } from "react";
import { useAPRPercentage } from "../../hooks/stake/useAPRPercentage";
import { useTotalStaked } from "../../hooks/stake/useTotalStaked";
import DocuBox from "../DocuBox";
import StakeWidget from "../StakeWidget";
import TotalPyroBox from "../TotalPyroBox";
import style from "./stake.module.css";

const Stake = ({info, pendingRewards}) => {

  const totalStaked = useTotalStaked();
  const APRPercentage = useAPRPercentage();
  const userStakedTokens = info ? info?.stakedAmount : 0;
  const rewards = pendingRewards ? pendingRewards : 0;
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.content__left}>
            <StakeWidget stakedTokens={userStakedTokens} rewards={rewards}/>
          </div>
          <div className={style.content__right}>
            <TotalPyroBox totalTokens={totalStaked ? utils.formatUnits(totalStaked, 18) : 0} />
            <DocuBox apr={APRPercentage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stake;
