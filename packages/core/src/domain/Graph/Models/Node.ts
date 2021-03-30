import { Point } from "./Point";

export interface Node {
  id: number;
  name: string;
  position: Point;
  color?: string;
  cssClass?: string;
  labelClass?: string;
  size?: number;
  width?: number;
  height?: number;
  svgAttributes?: Object;
}
