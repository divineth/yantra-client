import React, { useState, useEffect } from "react";
import style from "./stake-widget.module.css";
import CustomSlider from "../CustomSlider";
import ConfirmStakeModal from "../ConfirmStakeModal";
import { useStakeContract } from "../../hooks/useContract";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { TOKEN_ADDRESS } from "../../constants/address";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import {
  compareNonTokenWithToken,
  genFormatter,
  onInputNumberChange,
} from "../../utils/utils";
import { BigNumber } from "ethers";
import WalletManager from "../WalletManager";
import { useUnstakeTokens } from "../../hooks/stake/useUnstakeTokens";

const StakeWidget = ({ stakedTokens }) => {
  const { account } = useEthers();
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const stakeContract = useStakeContract();
  const balance = useTokenBalance(TOKEN_ADDRESS, account);

  const [formattedBalance, setFormattedBalance] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnstaking, setIsUnstaking] = useState(false);

  const { send: unstakeToken, state: unstakeState } = useUnstakeTokens();

  useEffect(() => {
    if (isUnstaking && unstakeState.status == "Success") {
      alert("Successfully unstaked");
      setIsUnstaking(false);
      setAmount(0);
    } else if (
      isUnstaking &&
      (unstakeState.status == "Fail" || unstakeState.status == "Exception")
    ) {
      alert("Failed to unstake tokens");
      setIsUnstaking(false);
      setAmount(0);
    }
  }, [unstakeState]);

  const handleUnstakeToken = () => {
    setIsUnstaking(true);
    try {
      void unstakeToken(parseUnits(amount, 18));
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsUnstaking(false);
    }
  };

  const handleStakeAmountChange = (value) => {
    setSliderValue(0);
    setAmount(value);
  };

  const setMaxValue = () => {
    setAmount((+formattedBalance).toFixed(0));
    setSliderValue(100);
  };

  const setStakeValue = (value) => {
    setSliderValue(value);
    if (balance) {
      const val = BigNumber.from(balance.mul(value).div(100));
      const res = formatUnits(val, 18);
      setAmount((+res).toFixed(0));
    }
  };

  useEffect(() => {
    if (balance) {
      setFormattedBalance(formatUnits(balance, 18));
    }
  }, [balance]);

  useEffect(() => {
    if (account) {
      if (amount <= 0) {
        setErrorMessage("Enter an amount");
      } else if (
        balance &&
        compareNonTokenWithToken(balance, amount, 18) == -1
      ) {
        setErrorMessage("Insufficient balance");
      } else {
        setErrorMessage("");
      }
    }
  }, [amount]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeWalletModal = () => {
    setWalletModalOpen(false);
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
          <p className="pt-1 nexa-reg-15 text-red-600">{errorMessage}</p>
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
          {account ? (
            <>
              <button
                onClick={() => {
                  setModalOpen(true);
                }}
                disabled={
                  amount <= 0 ||
                  compareNonTokenWithToken(balance, amount, 18) == -1 ||
                  isUnstaking
                }
              >
                Stake
              </button>
              <button
                disabled={
                  amount <= 0 ||
                  compareNonTokenWithToken(balance, amount, 18) == -1 ||
                  compareNonTokenWithToken(stakedTokens, amount, 18) == -1 ||
                  isUnstaking
                }
                onClick={handleUnstakeToken}
              >
                Unstake
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setWalletModalOpen(true);
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <WalletManager isOpen={walletModalOpen} onCloseModal={closeWalletModal} />
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
