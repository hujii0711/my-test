import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

function Content() {
  const { isDark } = useContext(ThemeContext);
  const { userNm } = useContext(UserContext);

  return (
    <div
      className="content"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <p>{userNm}님, 좋은 하루 되세요!!</p>
    </div>
  );
}

export default Content;
