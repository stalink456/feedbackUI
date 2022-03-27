import PropTypes from "prop-types";
import React from "react";

function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor
  };

  return (
    <div style={headerStyles}>
      <div className="container">
        <h2 style={{textAlign: 'center'}}>{text}</h2>
      </div>
    </div>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
};

Header.prototype = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
