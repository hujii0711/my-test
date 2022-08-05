import React, { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

function Footer() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { userNm, setUserNm } = useContext(UserContext);
  const inputRef = useRef(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setInputUserNm = () => {
    setUserNm(inputRef.current.value);
    inputRef.current.focus();
  };

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
      }}
    >
      <button className="button" onClick={toggleTheme}>
        Dark Mode
      </button>
      <input ref={inputRef}></input>
      <button className="button" onClick={setInputUserNm}>
        이름 변경
      </button>
      <p>{userNm}</p>
      {/* <form onSubmit={onSubmit}>
        <input value="" onChange={onChange} />
        <button type="submit">등록</button>
      </form> */}
    </footer>
  );
}

export default Footer;
