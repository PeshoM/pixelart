enum COLORS {
  Red = "red",
  Pink = "pink",
  Purple = "purple",
  Blue = "blue",
  Cyan = "cyan",
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  White = "white",
  Black = "black",
  Empty = ""
}

type ColorsType = COLORS.Empty | COLORS.Red | COLORS.Pink | COLORS.Purple | COLORS.Blue | COLORS.Cyan | COLORS.Green | COLORS.Yellow | COLORS.Orange | COLORS.White | COLORS.Black;

export { COLORS };
export type { ColorsType };