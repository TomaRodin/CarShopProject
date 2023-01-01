import React from "react";
import style from "../styles/style.module.css";

const Header = () => {
  return (
    <div className={style.header}>
      <img className={style.logo} src="http://react-app-ej.codevibe.hr/e2a8dcabe12e8a50275f.svg"/>

      <div className={style.topnav}>
        <a href="/">Home</a>
        <a href="/list">Cars list</a>
        <a href="#contact" className={style.contactUs}>Contact us</a>
      </div>
    </div>
  );
};

export default Header;
