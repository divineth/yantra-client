import React from 'react';
import { Slider } from "@mui/material";
import {withStyles} from "@mui/styles";

const CustomSlider = withStyles({
    rail: {
      color: "#4d4d4d",
      height: 7,
    },
    track: {
      backgroundImage: "linear-gradient(180deg, #FA6921 0%, #FA2032 100%, #FA2032 100%)",
      height: 7,
      border: "0px !important"
    },
    thumb:{
      width: 10,
      height: 10,
      color: "#ffffff",
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16) !important',
      },
    },
    mark:{
      color:"#4d4d4d !important",
      height: "4px !important",
      width: 1
    },
    markLabel:{
      color:"#4d4d4d !important",
      fontFamily: "Nexa-Regular, sans-serif !important",
      fontSize: "12px !important"
    }
  })(Slider);

export default CustomSlider;