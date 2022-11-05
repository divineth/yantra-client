import { useCall } from "@usedapp/core";
import { useStakeContract } from "./useContract";

export const usePendingRewards = (userAddress) => {

    const stakeContract = useStakeContract();

    const {value, error} = useCall(userAddress && {
        contract: stakeContract,
        method: 'pendingReward',
        args: [userAddress],
    }) ?? {}

    if(error) {
        console.error(error.message)
        return undefined
    }
    return value?.[0];
}