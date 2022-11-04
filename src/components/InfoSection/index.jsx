import React from "react";
import InfoBox from "../InfoBox";
import TimeBox from "../TimeBox";
import style from "./info-section.module.css";

const InfoSection = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <InfoBox title={"Holder Amount Staked"}/>
        <InfoBox title={"Holder Amount Earned"}/>
        <TimeBox />
      </div>
    </div>
  );
};

export default InfoSection;
