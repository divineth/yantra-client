import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import style from "./wallet-manager.module.css";
import MetaMask from "../../assets/images/metamask.png";
import WalletConnect from "../../assets/images/walletConnect.svg";
import Coinbase from "../../assets/images/coinbase.svg";
import CopySymbol from "../../assets/images/copy.svg";
import ExternalLink from "../../assets/images/external-link.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEthers, shortenIfAddress } from "@usedapp/core";
import Spinner from "../../assets/images/spinner.svg";

const providers = [
  {
    options: { type: "metamask" },
    displayName: "MetaMask",
    icon: MetaMask.src,
  },
  {
    options: { type: "coinbase" },
    displayName: "Coinbase Wallet",
    icon: Coinbase.src,
  },
  {
    options: { type: "metamask" },
    displayName: "WalletConnect",
    icon: WalletConnect.src,
  },
];

function WalletManager({ isOpen, onCloseModal }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { activateBrowserWallet, account, deactivate, error, isLoading } = useEthers();
  const [selectedKey, setSelectedKey] = useState(-1);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (account && isLoading) {
      setSelectedKey(-1);
    }
  }, [account]);

  useEffect(() => {
    if(error){
      setSelectedKey(-1);

      alert(error);
    }
  }, [error])
  

  const addressCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleConnectWallet = (options, key) => {
    setSelectedKey(key);
    try {
      activateBrowserWallet(options);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Transition appear show={isOpen && account == undefined} as={Fragment}>
        <Dialog as="div" className={style.wallet_dialog} onClose={onCloseModal}>
          <div className={style.wallet_dailog_containter}>
            <Dialog.Overlay className={style.wallet_dialog_overlay} />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className={style.wallet_dialog_containter_spacer}
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={style.wallet_dialog_content}>
                <div className={style.wallet_dialog_header}>
                  <div className={style.wallet_dialog_header_content}>
                    <Dialog.Title as="h3" className={style.wallet_dialog_title}>
                      Select a wallet
                    </Dialog.Title>
                    <span
                      onClick={onCloseModal}
                      className={style.wallet_dialog_close}
                    >
                      &times;
                    </span>
                  </div>
                </div>

                <div className={style.wallet_dialog_providers}>
                  <ul className={style.wallet_dialog_providers_list}>
                    {providers.map(({ options, displayName, icon }, key) => (
                      <li key={key}>
                        <button
                          disabled={isLoading}
                          onClick={() => handleConnectWallet(options, key)}
                        >
                          <img src={icon} alt={displayName} />
                          <span>{displayName}</span>
                          {isLoading && key == selectedKey  && (<span>
                            <img src={Spinner.src} alt="" />
                          </span>)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen && account != undefined} as={Fragment}>
        <Dialog as="div" className={style.wallet_dialog} onClose={onCloseModal}>
          <div className={style.wallet_dailog_containter}>
            <Dialog.Overlay className={style.wallet_dialog_overlay} />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className={style.wallet_dialog_containter_spacer}
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className={style.wallet_dialog_content}>
                <div className={style.wallet_dialog_header}>
                  <div className={style.wallet_dialog_header_content}>
                    <Dialog.Title as="h3" className={style.wallet_dialog_title}>
                      Account
                    </Dialog.Title>

                    <span
                      onClick={onCloseModal}
                      className={style.wallet_dialog_close}
                    >
                      &times;
                    </span>
                  </div>
                </div>

                <div className={style.wallet_dialog_body}>
                  <div className={style.wallet_dialog_provider}>
                    <p>Connected to $YANTRA</p>
                    <button
                      onClick={() => {
                        deactivate();
                      }}
                      className={style.wallet_dialog_disconnect}
                    >
                      Disconnect
                    </button>
                  </div>

                  <div className={style.wallet_dialog_address}>
                    <p>{shortenIfAddress(account)}</p>
                    <div className={style.wallet_dialog_address_copy_etherscan}>
                      <CopyToClipboard
                        text={account}
                        onCopy={() => addressCopied()}
                      >
                        <p className={style.wallet_dialog_bottom_text}>
                          <img src={CopySymbol.src} alt="etherscan" />
                          <span>Copy Address</span>
                          {copied ? (
                            <span className={style.tooltip}>Copied.</span>
                          ) : null}
                        </p>
                      </CopyToClipboard>

                      <p className={style.wallet_dialog_bottom_text}>
                        <a
                          href={`https://etherscan.io/address/${account}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={ExternalLink.src} alt="etherscan" />
                          <span>View on Etherscan</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default WalletManager;
