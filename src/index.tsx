import BruteForcePathfinder from "./pathfinders/bruteforce";
import { InputDialog } from "./dialog/InputDialog";
import { SelectDialog } from "./dialog/SelectDialog";
import { h } from "tsx-dom";
import Logger, { ConsoleLogOutput } from "./Logger";
import FloodfillPathfinder from "./pathfinders/floodfill";

export const logger: Logger = new Logger(new ConsoleLogOutput());

// https://docs.google.com/spreadsheets/d/1jM7PzNP-hXgMldEpWVUCW9yckyoewyVcfkUuHqHlAU4/edit?usp=sharing
const table = document.getElementById("grid") as HTMLElement;
/* const grid = [
    [2, 0, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 3],
]; */
/* const grid = [
    [2, 1, 0],
    [0, 0, 0],
    [1, 0, 3],
]; */
const grid = [
    [0, 0, 0, 0],
    [2, 1, 1, 0],
    [0, 0, 1, 3],
];
//const grid = genGrid(10, 10);
table.innerHTML = grid
    .map(
        (row, Nrow) =>
            `<tr>${row
                .map(
                    (cell, Ncell) =>
                        `<td id="X${Ncell}Y${Nrow}" class="cell ${
                            // @ts-ignore
                            { 0: "path", 1: "wall", 2: "start", 3: "end" }[cell]
                        }"></td>`
                )
                .join("")}</tr>`
    )
    .join("");
let carCoords: CarCoords = { x: 0, y: 1 };
let carCell = document.getElementById("X0Y1") as HTMLElement;
const car = document.createElement("div");
car.id = "car";
carCell.appendChild(car);
const moves = document.getElementById("moves") as HTMLElement;
let finished = false;
function move(direction: Direction, amount = 1): CarCoords | void {
    if (finished) {
        return;
    }
    const newCoords = { x: carCoords.x, y: carCoords.y };
    switch (direction) {
        case Direction.UP:
            console.log(`going up by ${amount}`);
            newCoords.y -= amount;
            break;
        case Direction.DOWN:
            console.log(`going down by ${amount}`);
            newCoords.y += amount;
            break;
        case Direction.LEFT:
            console.log(`going left by ${amount}`);
            newCoords.x -= amount;
            break;
        case Direction.RIGHT:
            console.log(`going right by ${amount}`);
            newCoords.x += amount;
            break;
    }
    if (newCoords.y < 0 || newCoords.y >= grid.length) {
        return console.error("Y coordinate out of bounds! Abandoning move.");
    } else if (newCoords.x < 0 || newCoords.x >= grid[newCoords.y]?.length) {
        return console.error("X coordinate out of bounds! Abandoning move.");
    } else if (
        document
            .getElementById(`X${newCoords.x}Y${newCoords.y}`)
            ?.classList.contains("wall")
    ) {
        return console.error("Target cell is a wall! Abandoning move.");
    } else {
        carCoords = newCoords;
        carCell = document.getElementById(
            `X${carCoords.x}Y${carCoords.y}`
        ) as HTMLElement;
        carCell.appendChild(car);
        moves.innerHTML = (+moves.innerHTML + amount).toString();
        if (carCell.classList.contains("end")) {
            setTimeout(
                () => alert(`Goal reached in ${moves.innerHTML} moves!`),
                100
            );
            finished = true;
        }
        return carCoords;
    }
}

function genGrid(x: number, y: number) {
    let grid = Array(x)
        .fill(null)
        .map(() => Array(y).fill(0));
    grid = grid.map((row: any[]) =>
        row.map(() => Math.round(Math.random() - 0.15))
    );
    grid[0][0] = 2;
    grid[x - 1][y - 1] = 3;
    return grid;
}

class ManualControlFunction implements Pathfinder {
    readonly name = "Manual Control";
    readonly description = "";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void
    ) {
        alert(`${this.name} has been activated.`);
        document.addEventListener("keydown", (e) => {
            if (!e.repeat) {
                if (["ArrowUp", "KeyW"].includes(e.code)) {
                    move(Direction.UP, 1);
                } else if (["ArrowDown", "KeyS"].includes(e.code)) {
                    move(Direction.DOWN, 1);
                } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
                    move(Direction.LEFT, 1);
                } else if (["ArrowRight", "KeyD"].includes(e.code)) {
                    move(Direction.RIGHT, 1);
                }
            }
        });
    }
}

const PATHFINDERS = [
    new ManualControlFunction(),
    new BruteForcePathfinder(),
    new FloodfillPathfinder(),
];
window.PATHFINDERS = PATHFINDERS;

let index = prompt(`Choose a pathfinder algorithm (type the number in front):
${PATHFINDERS.map((pathfinder, i) => `${i}: ${pathfinder.name}`).join("\n")}`);
while (!index || isNaN(+index) || PATHFINDERS.length <= +index) {
    index = prompt(`Invalid input! Please enter one of the numbers listed.

Choose a pathfinder algorithm (type the number in front):
${PATHFINDERS.map((pathfinder, i) => `${i}: ${pathfinder.name}`).join("\n")}`);
}
PATHFINDERS[+index].Pathfind(move, grid, carCoords);

//const dialog = new Dialog("test", "test dialog");
/* const dialog = new InputDialog(
    "prompt",
    "hello world",
    console.log,
    "placeholder"
); */
/* const pathfindersMap: Map<string, HTMLElement> = new Map();
PATHFINDERS.forEach((pathfinder, i) => {
    pathfindersMap.set(
        i.toString(),
        <div>
            <b style={{ fontSize: "1.5em" }}>{pathfinder.name}</b>,
            <p>{pathfinder.description}</p>,
        </div>
    );
});
const dialog = new SelectDialog(
    "Select a pathfinder:",
    "Pathfinder",
    pathfindersMap,
    console.log
);
// @ts-ignore
window.dialog = dialog;
 */
