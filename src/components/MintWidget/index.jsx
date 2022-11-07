import React, { useState, useEffect } from "react";
import style from "./mint-widget.module.css";
import NFTPlaceholder from "../../assets/images/yantra-nft-placeholder.jpg";
import CustomSlider from "../CustomSlider";
import WalletManager from "../WalletManager";
import { useEthers } from "@usedapp/core";
import { useNFTStatus } from "../../hooks/mint/useNFTStatus";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { useWalletMints } from "../../hooks/mint/useWalletMints";
import { onInputNumberChange } from "../../utils/utils";
import { useMintNFT } from "../../hooks/mint/useMintNFT";
import SpinnerAlt from "../../assets/images/spinner-alt.svg";
import { useRouter } from "next/router";

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 10,
    label: "10",
  },
];

const MintWidget = () => {
  const { account } = useEthers();
  const router = useRouter();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [nftAmount, setNftAmount] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const saleStatus = useNFTStatus();
  const walletMints = useWalletMints(account);

  const { send: mintNFT, state: mintNFTState } = useMintNFT();

  const handleNFTAmountChange = (value) => {
    setSliderValue(1);
    setNftAmount(value);
  };

  const checkRoundClosed = () => {
    if(!saleStatus) return;

    return BigNumber.from(saleStatus?._roundSupply).eq(saleStatus?._roundLimit);
  }

  useEffect(() => {
    if (isMinting && mintNFTState.status == "Success") {
      alert("NFT Minted Successfully");
      setIsMinting(false);
      router.reload();
    } else if (
      isMinting &&
      (mintNFTState.status == "Fail" || mintNFTState.status == "Exception")
    ) {
      alert("Failed to mint NFTs");
      setIsMinting(false);
    }
  }, [mintNFTState]);

  const handleMintNFT = () => {
    setIsMinting(true);
    const price = saleStatus?._mintPrice
      ? BigNumber.from(saleStatus?._mintPrice).mul(
          nftAmount > 0 ? nftAmount : 0
        )
      : 0;
    try {
      void mintNFT(BigNumber.from(nftAmount), { value: price.toString() });
    } catch (e) {
      console.error("Exception Thrown: ", e);
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (account) {
      if (nftAmount <= 0) {
        setErrorMessage("Enter the number of NFTs to mint");
      } else if (nftAmount > 10) {
        setErrorMessage("Max mint amount exceeded");
      } else {
        setErrorMessage("");
      }
    }
  }, [nftAmount]);

  const closeWalletModal = () => {
    setWalletModalOpen(false);
  };

  const setMaxValue = () => {
    setNftAmount(10);
    setSliderValue(10);
  };

  const setNFTAmountValue = (value) => {
    setSliderValue(value);
    setNftAmount(value);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.mint__header}>
          <h2>Mint Your NFT</h2>
          <p>
            <span className="text-[#FB2032]">Total Supply:</span> 5000
          </p>
          {account != undefined && (
            <p>
              <span className="text-[#FB2032]">Round Details:</span>{" "}
              {saleStatus
                ? BigNumber.from(saleStatus?._roundSupply).toString()
                : "-"}{" "}
              /{" "}
              {saleStatus
                ? BigNumber.from(saleStatus?._roundLimit).toString()
                : "-"}
            </p>
          )}
        </div>
        <div className={style.mint__info}>
          <img src={NFTPlaceholder.src} alt="" />
          <div className={style.mint__info__text}>
            <p>Price Per $YANTRA NFT</p>
            {account == undefined ? (
              <h3>Not Connected</h3>
            ) : (
              <div className="flex flex-col items-end">
                <h3>
                  {saleStatus ? formatUnits(saleStatus?._mintPrice) : "-"}ETH
                </h3>
                <h3>
                  Max Per Mint:{" "}
                  {saleStatus
                    ? BigNumber.from(saleStatus?._maxPerTx).toString()
                    : "-"}
                </h3>
                <h3>
                  Total Minted:{" "}
                  {walletMints ? BigNumber.from(walletMints).toString() : "-"}
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className={style.mint__form}>
          <div className={style.mint__price}>
            <h3>Amount</h3>
            <h3>
              Price:{" "}
              {saleStatus
                ? nftAmount < 0 || nftAmount > 10
                  ? "0"
                  : Number(
                      formatUnits(
                        BigNumber.from(saleStatus?._mintPrice).mul(
                          nftAmount > 0 ? nftAmount : 0
                        )
                      )
                    )
                : "-"}
              ETH
            </h3>
          </div>
          <input
            type="text"
            value={nftAmount}
            onChange={(e) => onInputNumberChange(e, handleNFTAmountChange)}
          />
          <p className="pt-1 nexa-reg-15 text-red-600">{errorMessage}</p>
          <div className={style.mint__slider}>
            <CustomSlider
              aria-label="amount"
              defaultValue={0}
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={10}
              marks={marks}
              value={sliderValue}
              onChange={(e) => {
                setNFTAmountValue(e.target.value);
              }}
            />
            <button onClick={setMaxValue}>Max</button>
          </div>
        </div>
        <div className={style.mint__buttons}>
          {account == undefined ? (
            <button
              onClick={() => {
                setWalletModalOpen(true);
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              disabled={nftAmount <= 0 || nftAmount > 10 || isMinting || checkRoundClosed()}
              onClick={handleMintNFT}
              className="flex justify-center items-center gap-1"
            >
              {checkRoundClosed() ? "Round Closed" : "Mint NFT"}
              {isMinting && <img className="w-6" src={SpinnerAlt.src} alt="" />}
            </button>
          )}
        </div>
      </div>
      <WalletManager isOpen={walletModalOpen} onCloseModal={closeWalletModal} />
    </div>
  );
};

export default MintWidget;
