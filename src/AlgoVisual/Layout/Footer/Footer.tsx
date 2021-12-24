import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <p id={"footer-header"}> Connect with me through these platforms </p>
      <div id="contact-wrapper">
        <ul>
          <li>
            <a href="https://github.com/eduardo-vidals" target={"_blank"} className={"social-link"}>
              <i className={"fab fa-github"}> </i>
              <span className={"social-text"}> GitHub </span>
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/eduardo-vidals" target={"blank"} className={"social-link"}>
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

          <li>
            <a className={"social-link"}>
              <i className={"fab fa-discord"}> </i>
              <span className={"social-text"}> Discord </span>
            </a>
          </li>

          <li>
            <a className={"social-link"}>
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
