import { Mainnet, Goerli, Localhost, Mumbai } from "@usedapp/core";

export const TOKEN_ADDRESS = {
  [Mainnet.chainId]: "0xd55231b619Ec464347d7b6eB12Cc7AE19fBbf37D",
  [Goerli.chainId]: "0x2BC191693e59E48cae8837831a241C5A44341616",
  [Localhost.chainId]: "0x09f3Df241abfFFa7a7760D75490fF6B273be3fda",
  [Mumbai.chainId]: "0x7566C7eF6A1087A6270d5dEcc7e6E360E6Ad3ac7",
};

export const STAKE_ADDRESS = {
  [Mainnet.chainId]: "0xA08505f1d807D238CA3BeA4Fd920D37b9352672a",
  [Goerli.chainId]: "0x96E5234CADFf2cACFe801415d33a86c928feA07E",
  [Localhost.chainId]: "0x837f54E182ED044aCD484bF83eF8e9E299Fe64fe",
  [Mumbai.chainId]: "0xc6D23f7Da9927599E843030d85ef94E72dB8Ae51",
};

export const NFT_ADDRESS = {
  [Mainnet.chainId]: "",
  [Goerli.chainId]: "",
  [Localhost.chainId]: "0xA65216eFB6c210080302Dbd7AEE0D8f2E1a39d53",
  [Mumbai.chainId]: "0xB61E1ec7Bb0E0f6F0753eDCD9786b598DBa832ed",
};

export const YANTRA_ETH_PAIR = "0x8c00410cf034c1ee6ff4ffd13340dafbab657234";
