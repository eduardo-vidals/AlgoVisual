import React from "react";
import {Slider} from "@mui/material";

type Props = {
  settingDescription: String,
  statusDescription: String,
  sliderStyle: any,
  optionsDisabled: boolean,
  onChange: any,
  defaultValue: number,
  min: number,
  max: number,
};

function AlgoSliderSetting(props: Props) {
  const {settingDescription, statusDescription, sliderStyle, optionsDisabled, onChange, defaultValue, min, max} = props;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <p> {statusDescription} </p>
      <Slider sx={sliderStyle} disabled={optionsDisabled} min={min}
              onChange={onChange} max={max} defaultValue={defaultValue}
              valueLabelDisplay="auto"/>
    </div>
  );
}

export default AlgoSliderSetting;
