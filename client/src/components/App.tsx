import "../styles/app.css";
import { COLORS, ColorsType } from "../enums/colors.enum";
import { TOOLS, ToolsType } from "../enums/tools.enum";
import { useDraw } from "./useDraw";

function App() {
  let colorsArr = [
    COLORS.Red,
    COLORS.Pink,
    COLORS.Purple,
    COLORS.Blue,
    COLORS.Cyan,
    COLORS.Green,
    COLORS.Yellow,
    COLORS.Orange,
    COLORS.White,
    COLORS.Black
  ];
  
  let toolsElements: ToolsType[] = [
    TOOLS.Brush,
    TOOLS.Bucket,
    TOOLS.EyeDropper,
    TOOLS.Eraser,
  ];
  const {
    arr,
    activeColor,
    activeTool,
    handleToolChange,
    handleColorChange,
    handleMouseUp,
    handleMouseDown,
    handleMouseOver,
    handleBoardClick,
  } = useDraw();

  return (
    <div className="mainDiv" onMouseUp={handleMouseUp}>
      <h1 className="mainTitle">pixelart</h1>
      <div className="mainLabel">Pick a Color</div>
      <div className="colorsDiv">
        {colorsArr.map((color: ColorsType) => {
          return (
            <div
              className={`${color} colors ${activeColor === color ? "activeColor" : ""}`}
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
            <img className={`toolsImg ${activeTool === tool ? "activeTool" : ""}`} src={`../icons8-${tool}-100.png`}></img>
          </div>
        ))}
      </div>
      <div className="mainLabel">Click a Pixel</div>
      <div className="mainArray">
        {arr &&
          arr.map((array: string[], row: number) => {
            return (
              <div className="array" key={row}>
                {array.map((_elements: string, col: number) => {
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
