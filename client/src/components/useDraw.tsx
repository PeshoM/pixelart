import { useEffect, useState } from 'react';
import { COLORS } from "../enums/colors.enum";
import { TOOLS, ToolsType } from "../enums/tools.enum";
import socket from '../socket';

const SERVER_URL: string = 'http://localhost:8000';

const useDraw = () => {
  let rows: number = 20,
    cols: number = 20;
  const [arr, setArr] = useState<Array<string[]>>(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [color, setColors] = useState<string>(COLORS.Red);
  const [tools, setTools] = useState<ToolsType>(TOOLS.Brush);
  const [held, setHeld] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on('board-update', (updatedBoard: string[][]) => {
      console.log('Received updated board from server:', updatedBoard);
      setArr(updatedBoard);
    });

    return () => {
      socket.off('board-update');
      socket.disconnect();
    };
  }, []);

  useEffect( () => {
    console.log("board changed", arr);
  }, [arr]);

  const handleColorChange = (color: string) => {
    setColors(color);
  };

  const handleToolChange = (tool: ToolsType) => {
    setTools(tool);
  };

  const handleBrushClick = (row: number, col: number) => {
    let newBoard: string[][] = [...arr];
    arr[row][col] = color;
    setArr(newBoard);
    socket.emit('board-update', newBoard);
  };

  const handleMouseOver = (clickedRow: number, clickedCol: number) => {
    return (
      held &&
      tools === TOOLS.Brush &&
      map.get(tools)?.(clickedRow, clickedCol)
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

    while (queue.length !== 0) {
      let top: { x: number; y: number } = queue[0];
      queue.shift();
      if (top.x - 1 >= 0 && res[top.x - 1][top.y] === changableColor) {
        queue.push({ x: top.x - 1, y: top.y });
        res[top.x - 1][top.y] = color;
      }
      if (
        top.x + 1 < res.length &&
        res[top.x + 1][top.y] === changableColor
      ) {
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
    socket.emit('board-update', res);
  };

  const handleEyedropperClick = () => { };

  const handleEraserClick = () => { };

  const handleBoardClick = (clickedRow: number, clickedCol: number) => {
    map.get(tools)?.(clickedRow, clickedCol);
  };

  let map = new Map([
    [TOOLS.Brush, handleBrushClick],
    [TOOLS.Bucket, handleBucketClick],
    [TOOLS.EyeDropper, handleEyedropperClick],
    [TOOLS.Eraser, handleEraserClick],
  ]);

  return {
    arr,
    handleToolChange,
    handleColorChange,
    handleMouseUp,
    handleMouseDown,
    handleMouseOver,
    handleBoardClick,
  };
}

export { useDraw };