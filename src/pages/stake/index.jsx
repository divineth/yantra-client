import InfoSection from "../../components/InfoSection";
import Stake from "../../components/Stake";
import { useEthers } from "@usedapp/core";
import { useStakerInfo } from "../../hooks/stake/useStakerInfo";
import { usePendingRewards } from "../../hooks/stake/usePendingRewards";
import { TOKEN_ADDRESS } from "../../constants/address";

export default function StakePage() {
  const { account } = useEthers();
  const staker = useStakerInfo(account);
  const rewards = usePendingRewards(account);

  return (
    <>
      <InfoSection info={staker} pendingRewards={rewards} />
      <Stake info={staker}/>
    </>
  );
}
