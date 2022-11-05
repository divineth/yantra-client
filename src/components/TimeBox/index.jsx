import React, { useState, useEffect } from "react";
import style from "./info-box.module.css";
import Info1 from "../../assets/images/info_one.svg";
import intervalToDuration from "date-fns/intervalToDuration";

const TimeBox = ({ timestamp }) => {
  const [timer, setTimer] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timestamp > 0) {
        setTimer(
          intervalToDuration({ start: new Date(timestamp), end: new Date() })
        );
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <p>Time Since Initial Stake</p>
          <img src={Info1.src} alt="" />
        </div>
        <div className={style.info__value}>
          <div className={style.time}>
            <div className={style.time__value}>
              {timer ? timer?.days : "00"}
            </div>
            <div className={style.time__unit}>Days</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>
              {timer ? timer?.hours : "00"}
            </div>
            <div className={style.time__unit}>Hours</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>
              {timer ? timer?.minutes : "00"}
            </div>
            <div className={style.time__unit}>Mins</div>
          </div>
          <div className={style.time__separator}>:</div>
          <div className={style.time}>
            <div className={style.time__value}>
              {timer ? timer?.seconds : "00"}
            </div>
            <div className={style.time__unit}>Secs</div>
          </div>
        </div>
        <div className={style.unlock_date}>
          {timestamp == 0 ? "You haven't staked yet" : timestamp}
        </div>
      </div>
    </div>
  );
};

export default TimeBox;
