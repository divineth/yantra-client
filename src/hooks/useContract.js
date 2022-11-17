import { utils } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { Mainnet, useEthers } from '@usedapp/core';
import { ETH_USDT_PAIR, NFT_ADDRESS, STAKE_ADDRESS, TOKEN_ADDRESS, YANTRA_ETH_PAIR } from '../constants/address';
import STAKE_ABI from '../contracts/SRI.json';
import ERC20ABI from '../contracts/ERC20ABI.json';
import UniswapV2 from '../contracts/UniswapV2.json';
import NFT_ABI from '../contracts/YantraNFTs.json';

export function useTokenContract(){
    return new Contract(TOKEN_ADDRESS[Mainnet.chainId], new utils.Interface(ERC20ABI));
}

export function useYantraEthContract(){
    return new Contract(YANTRA_ETH_PAIR, new utils.Interface(UniswapV2));
}

export function useEthUSDTContract(){
    return new Contract(ETH_USDT_PAIR, new utils.Interface(UniswapV2));
}

export function useStakeContract() {
    const { chainId } = useEthers();
    return new Contract(STAKE_ADDRESS[Mainnet.chainId], new utils.Interface(STAKE_ABI.abi));
}

export function useNFTContract() {
    return new Contract(NFT_ADDRESS[Mainnet.chainId], new utils.Interface(NFT_ABI));
}