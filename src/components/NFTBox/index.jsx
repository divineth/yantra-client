import React from 'react';
import style from './nft-box.module.css';
import NFTPlaceholder from "../../assets/images/yantra-nft-placeholder.jpg";

const NFTBox = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <img src={NFTPlaceholder.src} alt="" />
      </div>
    </div>
  )
}

export default NFTBox;