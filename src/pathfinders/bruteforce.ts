export default class BruteForcePathfinder implements Pathfinder {
    readonly name = "Brute Force";
    readonly description = "This pathfinder brute forces paths.";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        alert(`${this.name} has been activated.`);
        while (grid[carCoords.x][carCoords.y] !== CarSpace.end) {
            carCoords = move(~~(Math.random() * 3)) || carCoords;
        }
    }
}
