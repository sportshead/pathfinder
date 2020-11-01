import { random } from "cli-spinners";

export default class BruteForcePathfinder implements Pathfinder {
    readonly name = "Brute Force";
    readonly description = "This pathfinder brute forces paths.";
    Pathfind(
        move: (direction: DIRECTIONS, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        alert(`${this.name} has been activated.`);
        while (grid[carCoords.x][carCoords.y] !== CarSpace.end) {
            move(DIRECTIONS);
        }
    }
}
