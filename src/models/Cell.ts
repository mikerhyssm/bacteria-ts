import { ValueObject, Set } from 'immutable';

export class Cell implements ValueObject {

  constructor(public x: number, public y: number) {}

  equals(otherCell: Cell) {
    return this.x === otherCell.x && this.y === otherCell.y;
  }

  public getNeighbours() : Set<Cell> {
    const coordDiffs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

    return Set(coordDiffs.map(([x, y]) => this.getDiff(x,y)));
  }

  hashCode() {
    const s = `${this.x}|${this.y}`;
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  }

  private getDiff(x: number, y:number) {
    return new Cell(this.x -x, this.y - y);
  }
}
