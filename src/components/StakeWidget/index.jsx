import React, { useState, useEffect } from "react";
import style from "./stake-widget.module.css";
import CustomSlider from "../CustomSlider";
import ConfirmStakeModal from "../ConfirmStakeModal";
import { useStakeContract } from "../../hooks/useContract";
import { Mainnet, useEthers, useTokenBalance } from "@usedapp/core";
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

import SpinnerAlt from "../../assets/images/spinner-alt.svg";
import { useYantraDapp } from "../../providers/YantraProvider/YantraDappProvider";
import { useClaimRewards } from "../../hooks/stake/useClaimRewards";

const StakeWidget = ({ stakedTokens, rewards }) => {
  const { account } = useEthers();
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const stakeContract = useStakeContract();
  const balance = useTokenBalance(TOKEN_ADDRESS[Mainnet.chainId], account);

  const [formattedBalance, setFormattedBalance] = useState(0);

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const { isChainError } = useYantraDapp();

  const { send: unstakeToken, state: unstakeState } = useUnstakeTokens();
  const { send: claimRewards, state: claimState } = useClaimRewards();

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
    }
  }, [unstakeState]);

  useEffect(() => {
    if (isClaiming && claimState.status == "Success") {
      alert("Rewards claimed successfully");
      setIsClaiming(false);
    } else if (
      isClaiming &&
      (claimState.status == "Fail" || claimState.status == "Exception")
    ) {
      alert(
        claimState.errorMessage.charAt(0).toUpperCase() +
          claimState.errorMessage.slice(1)
      );
      setIsClaiming(false);
    }
  }, [claimState]);

  const handleUnstakeToken = () => {
    setIsUnstaking(true);
    try {
      void unstakeToken(parseUnits(amount, 18));
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsUnstaking(false);
    }
  };

  const handleClaimRewards = () => {
    setIsClaiming(true);
    try {
      void claimRewards();
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsClaiming(false);
    }
  };

  const handleStakeAmountChange = (value) => {
    setAmount(value);
  };

  const setMaxValue = () => {
    setAmount(formattedBalance);
  };

  useEffect(() => {
    if (balance) {
      setFormattedBalance(formatUnits(balance, 18));
    } else {
      setFormattedBalance(0);
    }
  }, [balance]);

  useEffect(() => {
    if (account) {
      if (amount <= 0) {
        setErrorMessage("Enter an amount");
      } else if (
        balance != undefined &&
        compareNonTokenWithToken(balance, amount, 18) == -1 &&
        stakedTokens != undefined &&
        compareNonTokenWithToken(stakedTokens, amount, 18) == -1
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
    <div className={`${style.container}`}>
      <div className={style.content}>
        <div className={style.stake__header}>
          <p className={style.stake__title}>Stake</p>
          <p className={style.stake__balance}>
            Balance: {genFormatter.format(formattedBalance)}
          </p>
        </div>
        <div className={style.stake__form}>
          <div className="flex justify-between gap-4">
            <input
              className={style.stake__input}
              type="text"
              value={amount}
              onChange={(e) => {
                onInputNumberChange(e, handleStakeAmountChange);
              }}
            />
            <button onClick={setMaxValue}>Max</button>
          </div>
          <p className="pt-1 nexa-reg-15 text-red-600">{errorMessage}</p>
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
                  isUnstaking ||
                  isChainError ||
                  isClaiming
                }
              >
                Stake
              </button>
              <button
                disabled={
                  amount <= 0 ||
                  compareNonTokenWithToken(stakedTokens, amount, 18) == -1 ||
                  isUnstaking ||
                  isChainError ||
                  isClaiming
                }
                onClick={handleUnstakeToken}
                className="flex justify-center items-center gap-1"
              >
                Unstake
                {isUnstaking && (
                  <img className="w-6" src={SpinnerAlt.src} alt="" />
                )}
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
        {account && (
          <div className={`${style.stake__buttons} pt-4`}>
            <button
              disabled={
                rewards <= 0 || isUnstaking || isClaiming || isChainError
              }
              className="flex justify-center items-center gap-1"
              onClick={handleClaimRewards}
            >
              Claim Rewards
              {isClaiming && (
                <img className="w-6" src={SpinnerAlt.src} alt="" />
              )}
            </button>
          </div>
        )}
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
