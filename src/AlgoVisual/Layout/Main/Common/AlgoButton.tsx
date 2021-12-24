import React, {createRef} from "react";

type Props = {
  buttonText: String
  optionDisabled: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

function AlgoButton(props: Props) {
  const {buttonText, optionDisabled, onClick} = props;

  const buttonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!optionDisabled) {
      e.currentTarget.style.color = "#98d6e8";
    }
  }

  const buttonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!optionDisabled) {
      e.currentTarget.style.color = "#fff";
    }
  }

  return (
    <button disabled={optionDisabled} className={"sidebar-button"} onClick={onClick}
            onMouseEnter={buttonEnter} onMouseLeave={buttonLeave}>
      {buttonText}
    </button>
  );

}

export default AlgoButton;
