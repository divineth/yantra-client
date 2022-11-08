import { utils } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { Mumbai, useEthers } from '@usedapp/core';
import { NFT_ADDRESS, STAKE_ADDRESS, TOKEN_ADDRESS, YANTRA_ETH_PAIR } from '../constants/address';
import STAKE_ABI from '../contracts/SRI.json';
import ERC20ABI from '../contracts/ERC20ABI.json';
import UniswapV2 from '../contracts/UniswapV2.json';
import NFT_ABI from '../contracts/VoiNFT.json';

export function useTokenContract(){
    return new Contract(TOKEN_ADDRESS[Mumbai.chainId], new utils.Interface(ERC20ABI));
}

export function useYantraEthContract(){
    return new Contract(YANTRA_ETH_PAIR, new utils.Interface(UniswapV2));
}

export function useEthUSDTContract(){
    return new Contract("0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852", new utils.Interface(UniswapV2));
}

export function useStakeContract() {
    const { chainId } = useEthers();
    return new Contract(STAKE_ADDRESS[Mumbai.chainId], new utils.Interface(STAKE_ABI.abi));
}

export function useNFTContract() {
    return new Contract(NFT_ADDRESS[Mumbai.chainId], new utils.Interface(NFT_ABI.abi));
}