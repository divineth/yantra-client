import React, { useState } from "react";
import style from "./stake-widget.module.css";
import CustomSlider from "../CustomSlider";
import ConfirmStakeModal from "../ConfirmStakeModal";

const StakeWidget = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 60,
      label: "60",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.stake__header}>
          <p className={style.stake__title}>Stake</p>
          <p className={style.stake__balance}>Balance: 0.00</p>
        </div>
        <div className={style.stake__form}>
          <input className={style.stake__input} type="text" />
          <div className={style.stake__slider}>
            <CustomSlider
              aria-label="amount"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={100}
              marks={marks}
            />
            <button>Max</button>
          </div>
        </div>
        <div className={style.stake__buttons}>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Stake
          </button>
          <button disabled={true}>Unstake</button>
        </div>
      </div>
      <ConfirmStakeModal isOpen={modalOpen} onCloseModal={closeModal} />
    </div>
  );
};

export default StakeWidget;
