import { formatUnits } from "ethers/lib/utils";
import React from "react";
import InfoBox from "../InfoBox";
import TimeBox from "../TimeBox";
import style from "./info-section.module.css";

const InfoSection = ({info, pendingRewards}) => {
  
  return (
    <div className={style.container}>
      <div className={style.content}>
        <InfoBox title={"Holder Amount Staked"} value={info ? formatUnits(info?.stakedAmount, 18) : 0} decimalPlaces={0}/>
        <InfoBox title={"Holder Amount Earned"} value={pendingRewards ? formatUnits(pendingRewards, 18) : 0} decimalPlaces={4} />
        <TimeBox timestamp={info ? info?.since * 1000 : 0}/>
      </div>
    </div>
  );
};

export default InfoSection;
