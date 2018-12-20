import { Set } from "immutable";
import { Cell } from "./Cell";

export class Grid {
  constructor(private occupiedCells: Set<Cell>) {}

  getNextGeneration(): Grid {
    const newOccupiedCellsFromLive = this.occupiedCells
      .filter(cell => isDeadNextGen(cell.getNeighbours(), this.occupiedCells));

    const newOccupiedCellsFromDead = this.occupiedCells
      .flatMap(cell => cell.getNeighbours())
      .filter(cell => this.occupiedCells.contains(cell));
    return new Grid(Set());
  }
}


function isDeadNextGen(neighbours: Set<Cell>, occupiedCells: Set<Cell>) {
  const numberOfMatchingCells = neighbours.union(occupiedCells).size;
  return numberOfMatchingCells > 3 || numberOfMatchingCells  < 2;
}
