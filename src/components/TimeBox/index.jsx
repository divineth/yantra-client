import React from "react";
import style from "./info-box.module.css";
import Info1 from "../../assets/images/info_one.svg";

const TimeBox = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <p>Unlock Time</p>
          <img src={Info1} alt="" />
        </div>
        <div className={style.info__value}>
          <div className={style.time}>
            <div className={style.time__value}>09</div>
            <div className={style.time__unit}>Days</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>23</div>
            <div className={style.time__unit}>Hours</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>38</div>
            <div className={style.time__unit}>Mins</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>16</div>
            <div className={style.time__unit}>Secs</div>
          </div>
        </div>
        <div className={style.unlock_date}>01 / 22 / 2023</div>
      </div>
    </div>
  );
};

export default TimeBox;
