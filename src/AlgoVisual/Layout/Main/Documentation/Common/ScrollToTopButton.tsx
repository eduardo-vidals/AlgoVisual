import React, {useEffect, useState} from "react";
import "./ScrollToTopButton.css";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      toggleVisibility();
    });
  })

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className={"scroll-to-top-button"}>
      {isVisible && (
        <div onClick={scrollToTop}>
          <div className={"scroll-up"}>
            <i className="fas fa-angle-up"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScrollToTopButton;
