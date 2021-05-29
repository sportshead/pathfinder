import MapWithDefault from "../MapWithDefault";

export default class AStar implements Pathfinder {
    readonly name = "A* Pathfinder";
    readonly description = "Pathfinder using the A* algorithm";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        alert(`${this.name} has been activated.`);
        const start = {
            space: grid[carCoords.x][carCoords.y],
            coords: carCoords,
        };
        const openSet = [start];
        const cameFrom = new Map<CarNode, CarNode>();
        const gScore = new MapWithDefault<CarNode, number>([], Infinity);
        gScore.set(start, 0);
    }
}
