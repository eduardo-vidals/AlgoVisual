import React from "react";

import {enabledButtonStyle, disabledButtonStyle} from "./Styles";

type Props = {
  buttonText: String
  disabled: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function AlgoButton(props: Props) {
  const {buttonText, disabled, onClick} = props;

  const buttonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.color = "#98d6e8";
    }
  }

  const buttonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.color = "#fff";
    }
  }

  const buttonStyle = disabled ? disabledButtonStyle : enabledButtonStyle;

  return (
    <button disabled={disabled} className={"sidebar-button"} onClick={onClick} style={buttonStyle}
            onMouseEnter={buttonEnter} onMouseLeave={buttonLeave}>
      {buttonText}
    </button>
  );

}

export default AlgoButton;
