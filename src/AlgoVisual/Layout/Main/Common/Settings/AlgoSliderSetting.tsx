import React from "react";
import {Slider} from "@mui/material";
import {disabledButtonStyle, disabledSliderStyle, enabledButtonStyle, enabledSliderStyle} from "../Styles";

type Props = {
  settingDescription: String,
  statusDescription: String,
  disabled: boolean,
  onChange: any,
  defaultValue: number,
  min: number,
  max: number,
};

function AlgoSliderSetting(props: Props) {
  const {settingDescription, statusDescription, disabled, onChange, defaultValue, min, max} = props;

  const sliderStyle = disabled ? disabledSliderStyle : enabledSliderStyle;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <p> {statusDescription} </p>
      <Slider sx={sliderStyle} disabled={disabled} min={min}
              onChange={onChange} max={max} defaultValue={defaultValue}
              valueLabelDisplay="auto"/>
    </div>
  );
}

export default AlgoSliderSetting;
