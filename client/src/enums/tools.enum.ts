enum TOOLS {
  Brush = "brush",
  Bucket = "bucket",
  EyeDropper = "eyedropper",
  Eraser = "eraser",
}

type ToolsType = TOOLS.Brush | TOOLS.Bucket | TOOLS.EyeDropper | TOOLS.Eraser;

export { TOOLS };
export type { ToolsType };
