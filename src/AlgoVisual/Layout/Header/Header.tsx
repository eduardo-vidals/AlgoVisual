import React, {createRef, useEffect, useState} from "react";
import "./Header.css";
import {Link} from "react-router-dom"

function Header() {
  const dropdownMenu = createRef<HTMLDivElement>();
  const dropdownCaret = createRef<HTMLDivElement>();

  const [showAlgosMenu, setShowAlgosMenu] = useState(false);

  useEffect(() => {
    displayAlgosMenu();
  }, [showAlgosMenu]);

  const openAlgosMenu = (e: React.MouseEvent) => {
    // ensures that you close menu when clicked again
    if (!showAlgosMenu) {
      setShowAlgosMenu(true);
      // not sure why this works but will figure out soon
      // makes dropdown work magically!
      e.stopPropagation();
      document.addEventListener("click", closeAlgosMenu);
    }
  }

  const closeAlgosMenu = () => {
    setShowAlgosMenu(false);
    document.removeEventListener("click", closeAlgosMenu)
  }

  const displayAlgosMenu = () => {
    if (showAlgosMenu) {
      dropdownMenu.current!.style.display = "block";
      dropdownCaret.current!.style.transform = "rotate(180deg)";
      dropdownCaret.current!.style.transition = "all 300ms linear";
    } else {
      dropdownMenu.current!.style.display = "none";
      dropdownCaret.current!.style.transform = "rotate(0deg)";
      dropdownCaret.current!.style.transition = "all 300ms linear";
    }
  }

  return (
    <header id={"header"}>
      <div id={"logo-wrapper"}>
        <Link to={"/AlgoVisual"}>
          <p id={"name"}> AlgoVisual </p>
        </Link>
      </div>

      <div id={"nav-wrapper"}>
        <nav id={"nav-bar"}>
          <ul>
            <li>
              <div className={"nav-link"}>
                <div className={"nav-option"} onClick={openAlgosMenu}>
                  <p className={"noselect"}> Algorithms </p>
                  <i className="fas fa-caret-down" ref={dropdownCaret}> </i>
                </div>
                <div id={"dropdown"} ref={dropdownMenu}>
                  <ul>
                    <li>
                      <Link to={"/AlgoVisual/sorting"} className={"nav-link"}>
                        <div className={"algos-option"}>
                          <p> Sorting </p>
                        </div>
                      </Link>
                    </li>

                    <li>
                      <Link to={"/AlgoVisual/pathfinding"} className={"nav-link"}>
                        <div className={"algos-option"}>
                          <p> Pathfinding </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <Link to={"/AlgoVisual/documentation"} className={"nav-link"}>
                <div className={"nav-option"}>
                  <p> Documentation </p>
                </div>
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
