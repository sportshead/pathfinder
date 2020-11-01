declare const enum DIRECTIONS {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}
declare const enum CarSpace {
    "path",
    "wall",
    "start",
    "end",
}
interface CarCoords {
    x: number;
    y: number;
}
interface CarNode {
    coords: CarCoords;
    space: CarSpace;
}
interface Pathfinder {
    name: string;
    description: string;
    Pathfind(
        move: (direction: DIRECTIONS, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void;
}
interface Window {
    PATHFINDERS: Pathfinder[];
}
