import React, { useState, useEffect } from "react";
import style from "./stake-widget.module.css";
import CustomSlider from "../CustomSlider";
import ConfirmStakeModal from "../ConfirmStakeModal";
import { useStakeContract } from "../../hooks/useContract";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { TOKEN_ADDRESS } from "../../constants/address";
import { formatUnits } from "ethers/lib/utils";
import { genFormatter, onInputNumberChange } from "../../utils/utils";
import { BigNumber } from "ethers";

const StakeWidget = () => {
  const { account } = useEthers();
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const stakeContract = useStakeContract();
  const balance = useTokenBalance(TOKEN_ADDRESS, account);

  const [formattedBalance, setFormattedBalance] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const handleStakeAmountChange = (value) => {
    setSliderValue(0);
    setAmount(value);
  };

  const setMaxValue = () => {
    setAmount(formattedBalance);
    setSliderValue(100);
  };

  const setStakeValue = (value) => {
    setSliderValue(value);
    if (balance) {
      const val = BigNumber.from(balance.mul(value).div(100));
      setAmount(formatUnits(val), 18);
    }
  };

  useEffect(() => {
    if (balance) {
      setFormattedBalance(formatUnits(balance, 18));
    }
  }, [balance]);

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
          <p className={style.stake__balance}>
            Balance: {genFormatter.format(formattedBalance)}
          </p>
        </div>
        <div className={style.stake__form}>
          <input
            className={style.stake__input}
            type="text"
            value={amount}
            onChange={(e) => {
              onInputNumberChange(e, handleStakeAmountChange);
            }}
          />
          <div className={style.stake__slider}>
            <CustomSlider
              aria-label="amount"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={100}
              marks={marks}
              value={sliderValue}
              onChange={(e) => setStakeValue(e.target.value)}
            />
            <button onClick={setMaxValue}>Max</button>
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
      <ConfirmStakeModal
        isOpen={modalOpen}
        onCloseModal={closeModal}
        stakeAmount={amount}
        contract={stakeContract?.address}
      />
    </div>
  );
};

export default StakeWidget;
