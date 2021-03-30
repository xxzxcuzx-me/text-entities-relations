import { Point } from "./Point";

export interface Link {
  id: number;
  targetNodeId: number;
  sourceNodeId: number;
  linkPower: number;
  color?: string;
  svgAttributes?: {
    [x: string]: any;
  };
  sourcePosition: Point;
  targetPosition: Point;
}
