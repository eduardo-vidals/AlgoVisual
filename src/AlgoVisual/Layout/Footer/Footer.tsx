import React, {useState} from "react";
import "./Footer.css";

function Footer() {
  const [copyDiscordVisible, setCopyDiscordVisible] = useState(false);
  const [copyEmailVisibile, setCopyEmailVisible] = useState(false);

  const copyToClipboard = () => {

  }

  return (
    <footer id="footer">
      <p id={"footer-header"}> Connect with me through these platforms </p>
      <div id="contact-wrapper">
        <ul>
          <li>
            <a href="https://github.com/eduardovidals" target={"_blank"} className={"social-link"}>
              <i className={"fab fa-github"}> </i>
              <span className={"social-text"}> GitHub </span>
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/eduardovidals" target={"blank"} className={"social-link"}>
              <i className={"fab fa-linkedin-in"}> </i>
              <span className={"social-text"}> LinkedIn </span>
            </a>
          </li>

          <li>
            <a href="https://www.instagram.com/eddy_the_professionalpenguin" target={"blank"}
               className={"social-link"}>
              <i className={"fab fa-instagram"}> </i>
              <span className={"social-text"}> Instagram </span>
            </a>
          </li>

          <li className={"copied-parent"}>
            {copyDiscordVisible ?
              <div className={"copied"}>
                <p className={"copied-text"}> Copied discord! </p>
              </div>
              : null}
            <a className={"social-link"} onClick={() => {
              setCopyDiscordVisible(true);
              navigator.clipboard.writeText("baldder#8949");
              setTimeout(() => {
                setCopyDiscordVisible(false);
              }, 1500)
            }}>
              <i className={"fab fa-discord"}> </i>
              <span className={"social-text"}> Discord </span>
            </a>
          </li>

          <li className={'copied-parent'}>
            {copyEmailVisibile ?
              <div className={"copied"}>
                <p className={"copied-text"}> Copied email! </p>
              </div>
              : null}
            <a className={"social-link"} onClick={() => {
              setCopyEmailVisible(true);
              navigator.clipboard.writeText("eduardovidals69@gmail.com");
              setTimeout(() => {
                setCopyEmailVisible(false);
              }, 1500)
            }}>
              <i className={"fas fa-envelope"}> </i>
              <span className={"social-text"}> Email </span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
