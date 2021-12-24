import React from "react";
import AlgoButton from "../AlgoButton";

type Props = {
  settingDescription: String,
  buttonText: String
  optionDisabled: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function AlgoButtonSetting(props: Props) {
  const {settingDescription, buttonText, optionDisabled, onClick} = props;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <AlgoButton buttonText={buttonText} optionDisabled={optionDisabled}
                  onClick={onClick}/>
    </div>
  );
}

export default AlgoButtonSetting;
