import React from "react";
import AlgoButton from "../AlgoButton";

type Props = {
  settingDescription: String,
  buttonText: String
  disabled: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function AlgoButtonSetting(props: Props) {
  const {settingDescription, buttonText, disabled, onClick} = props;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <AlgoButton buttonText={buttonText} disabled={disabled}
                  onClick={onClick}/>
    </div>
  );
}

export default AlgoButtonSetting;
