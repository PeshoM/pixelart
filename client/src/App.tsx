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
  const [held, setHeld] = useState<boolean>(false);

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

  const handleMouseOver = (clickedRow: number, clickedCol: number) => {
    return (
      held && tools === TOOLS.Brush && map.get(tools)?.(clickedRow, clickedCol)
    );
  };

  const handleMouseUp = () => setHeld(false);

  const handleMouseDown = () => setHeld(true);

  const bucketFill = (row: number, col: number) => {
    let changableColor: string = arr[row][col],
      positions: { x: number; y: number } = { x: row, y: col },
      queue = [];
    const res = [...arr];

    queue.push(positions);

    res[positions.x][positions.y] = color;

    while (queue.length != 0) {
      let top: { x: number; y: number } = queue[0];
      queue.shift();
      if (top.x - 1 >= 0 && res[top.x - 1][top.y] === changableColor) {
        queue.push({ x: top.x - 1, y: top.y });
        res[top.x - 1][top.y] = color;
      }
      if (top.x + 1 < res.length && res[top.x + 1][top.y] === changableColor) {
        queue.push({ x: top.x + 1, y: top.y });
        res[top.x + 1][top.y] = color;
      }
      if (top.y - 1 >= 0 && res[top.x][top.y - 1] === changableColor) {
        queue.push({ x: top.x, y: top.y - 1 });
        res[top.x][top.y - 1] = color;
      }
      if (
        top.y + 1 < res[row].length &&
        res[top.x][top.y + 1] === changableColor
      ) {
        queue.push({ x: top.x, y: top.y + 1 });
        res[top.x][top.y + 1] = color;
      }
    }
    return res;
  };

  const handleBucketClick = (clickedRow: number, clickedCol: number) => {
    if (
      color === arr[clickedRow][clickedCol] &&
      ((clickedRow - 1 >= 0 &&
        arr[clickedRow - 1][clickedCol] === arr[clickedRow][clickedCol]) ||
        (clickedRow + 1 < arr.length &&
          arr[clickedRow + 1][clickedCol] === arr[clickedRow][clickedCol]) ||
        (clickedCol - 1 >= 0 &&
          arr[clickedRow][clickedCol - 1] === arr[clickedRow][clickedCol]) ||
        (clickedCol + 1 < arr[clickedRow].length &&
          arr[clickedRow][clickedCol + 1] === arr[clickedRow][clickedCol]))
    )
      return arr;
    const res = bucketFill(clickedRow, clickedCol);
    setArr(() => res);
  };

  const handleEyedropperClick = () => {};

  const handleEraserClick = () => {};

  const handleBoardClick = (clickedRow: number, clickedCol: number) => {
    map.get(tools)?.(clickedRow, clickedCol);
  };

  let map = new Map([
    [TOOLS.Brush, handleBrushClick],
    [TOOLS.Bucket, handleBucketClick],
    [TOOLS.EyeDropper, handleEyedropperClick],
    [TOOLS.Eraser, handleEraserClick],
  ]);

  return (
    <div className="mainDiv" onMouseUp={handleMouseUp}>
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
                      onClick={() => handleBoardClick(row, col)}
                      onMouseDown={handleMouseDown}
                      onMouseOver={() => handleMouseOver(row, col)}
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
