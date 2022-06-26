import React, { createContext, useContext, useState, useEffect } from "react";
import "./style.css";

const styleState = {
  border: "5px solid black",
  color: "black",
};

const themeContext = createContext(styleState);

// children props는 컴포넌트 태그 사이에 넣어 준 값이다.
export default function App() {
  const [style, setStyle] = useState(styleState);

  useEffect(() => {
    console.log("useEffect!!!");
  }, []);

  return (
    <themeContext.Provider value={{ style, setStyle }}>
      <div className="root" style={style}>
        <h1>Hello World</h1>
        <Sub1>
          <Sub2 />
        </Sub1>
      </div>
    </themeContext.Provider>
  );
}

function Sub1({ children }) {
  const { style, setStyle } = useContext(themeContext);

  const onClick = () => {
    setStyle({ ...styleState, color: "red" });
  };

  return (
    <div style={style}>
      <h1>Sub1</h1>
      <button onClick={onClick}>확인(sub1)</button>
      {children}
    </div>
  );
}

function Sub2() {
  const { style } = useContext(themeContext);
  return (
    <div style={style}>
      <h1>Sub2</h1>
    </div>
  );
}
