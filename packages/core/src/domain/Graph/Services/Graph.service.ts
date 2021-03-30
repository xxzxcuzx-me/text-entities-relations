import Container, { Service } from "typedi";
import { Link } from "../Models/Link";
import { Node } from "../Models/Node";

@Service()
export class GraphService {
  private _nodes: Node[] = [];
  private _links: Link[] = [];

  static get(): GraphService {
    return Container.get(GraphService);
  }

  get nodes(): Node[] {
    return this._nodes;
  }

  get links(): Link[] {
    return this._links;
  }

  generateRandomNodes(): void {
    this._nodes = [...Array(10).keys()].map(this.formatNode);
  }

  generateLinks(): void {
    this._links = [
      {
        id: 1,
        linkPower: 10,
        sourceNodeId: 0,
        targetNodeId: 1,
        sourcePosition: {
          x: this.nodes[0].position.x,
          y: this.nodes[0].position.y,
        },
        targetPosition: {
          x: this.nodes[1].position.x,
          y: this.nodes[1].position.y,
        },
      },
      {
        id: 2,
        linkPower: 20,
        sourceNodeId: 1,
        targetNodeId: 2,
        sourcePosition: {
          x: this.nodes[1].position.x,
          y: this.nodes[1].position.y,
        },
        targetPosition: {
          x: this.nodes[2].position.x,
          y: this.nodes[2].position.y,
        },
      },
      {
        id: 3,
        linkPower: 2,
        sourceNodeId: 3,
        targetNodeId: 4,
        sourcePosition: {
          x: this.nodes[3].position.x,
          y: this.nodes[3].position.y,
        },
        targetPosition: {
          x: this.nodes[4].position.x,
          y: this.nodes[4].position.y,
        },
      },
    ];
  }

  formatNode(i: number): Node {
    return {
      id: i,
      name: `node-${i}`,
      position: {
        x: i + Math.floor(Math.random() * 100),
        y: i + Math.floor(Math.random() * 200),
      },
    };
  }
}
