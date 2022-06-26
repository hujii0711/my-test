import React, { createContext, useContext, useState, useEffect } from "react";
import "./style.css";

const styleState = {
  border: "5px solid black",
  color: "black",
};

const themeContext = createContext(styleState);

export default function App() {
  const [style, setStyle] = useState(styleState);

  const onClick = () => {
    setStyle({ ...styleState, color: "red" });
  };

  console.log("style=====", style);

  useEffect(() => {
    console.log("useEffect!!!");
  }, []);

  return (
    <themeContext.Provider value={style}>
      <div className="root" style={style}>
        <h1>Hello World</h1>
        <button onClick={onClick}>확인</button>
        <Sub1 />
      </div>
    </themeContext.Provider>
  );
}

function Sub1() {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub1</h1>
      <Sub2 />
    </div>
  );
}

function Sub2() {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  );
}

function Sub3() {
  const theme = useContext(themeContext);
  return (
    <div style={theme}>
      <h1>Sub3</h1>
    </div>
  );
}
