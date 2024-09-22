import React, { useState } from "react";
import "./app.css";

enum COLORS {
  Red = "red",
  Pink = "pink",
  Purple = "purple",
  Blue = "blue",
  Cyan = "cyan",
  Greem = "green",
  Yellow = "yellow",
  Orange = "orange",
  White = "white",
  Black = "black",
}

let colorsArr = [
  COLORS.Red,
  COLORS.Pink,
  COLORS.Purple,
  COLORS.Blue,
  COLORS.Cyan,
  COLORS.Greem,
  COLORS.Yellow,
  COLORS.Orange,
  COLORS.White,
  COLORS.Black,
];

enum TOOLS {
  Brush = "brush",
  Bucket = "bucket",
  EyeDropper = "eyedropper",
  Eraser = "eraser",
}

type ToolsType = TOOLS.Brush | TOOLS.Bucket | TOOLS.EyeDropper | TOOLS.Eraser;

let toolsElements: ToolsType[] = [
  TOOLS.Brush,
  TOOLS.Bucket,
  TOOLS.EyeDropper,
  TOOLS.Eraser,
];

function App() {
  let rows: number = 20,
    cols: number = 20;
  const [arr, setArr] = useState<Array<string[]>>(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [color, setColors] = useState<string>(COLORS.Red);
  const [tools, setTools] = useState<ToolsType>(TOOLS.Brush);

  const handleColorChange = (color: string) => {
    setColors(color);
  };

  const handleToolChange = (tool: ToolsType) => {
    setTools(tool);
  };

  const handleBrushClick = (row: number, col: number) => {
    arr[row][col] = color;
    setArr(() => [...arr]);
  };

  return (
    <div className="mainDiv">
      <h1 className="mainTitle">pixelart</h1>
      <div className="mainLabel">Pick a Color</div>
      <div className="colorsDiv">
        {colorsArr.map((color: string) => {
          return (
            <div
              className={color + " colors"}
              onClick={() => {
                handleColorChange(color);
              }}
            ></div>
          );
        })}
      </div>
      <div className="toolsMenuDiv">
        {toolsElements.map((tool: ToolsType) => (
          <div
            className={"toolsImgDiv"}
            onClick={() => {
              handleToolChange(tool);
            }}
          >
            <img className="toolsImg" src={`../icons8-${tool}-100.png`}></img>
          </div>
        ))}
      </div>
      <div className="mainLabel">Click a Pixel</div>
      <div className="mainArray">
        {arr &&
          arr.map((array: string[], row: number) => {
            return (
              <div className="array" key={row}>
                {array.map((elements: string, col: number) => {
                  return (
                    <div
                      key={col}
                      className="elements"
                      style={{ backgroundColor: arr[row][col] }}
                      onClick={() => handleBrushClick(row, col)}
                    ></div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
