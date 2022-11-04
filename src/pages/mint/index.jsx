import MintWidget from "../../components/MintWidget";
import NFTBox from "../../components/NFTBox";

export default function Mint() {
  return (
    <div className="flex flex-col px-4 md:px-32 lg:px-8 xl:px-0 pt-12 pb-4 lg:pb-4 gap-8 lg:flex-row justify-center items-center">
      <NFTBox />
      <MintWidget />
    </div>
  );
}
