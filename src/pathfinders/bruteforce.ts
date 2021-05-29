export default class BruteForcePathfinder implements Pathfinder {
    readonly name = "Brute Force";
    readonly description = "This pathfinder brute forces paths.";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        alert(`${this.name} has been activated.`);
        const int = setInterval(() => {
            if (grid[carCoords.y][carCoords.x] === CarSpace.end) {
                clearInterval(int);
                return;
            }
            carCoords = move(~~(Math.random() * 4)) || carCoords;
        }, 500);
    }
}
