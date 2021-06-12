export default class FloodfillPathfinder implements Pathfinder {
    readonly name = "Floodfill Pathfinder";
    readonly description = "Floodfill.";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        const startCoords = this.find(grid, CarSpace.start);
        const endCoords = this.find(grid, CarSpace.end);
        const dir: [Direction, Direction] = [
            startCoords[0] > endCoords[0]
                ? Direction.LEFT
                : startCoords[0] < endCoords[0]
                ? Direction.RIGHT
                : Direction.NONE,
            startCoords[1] > endCoords[1]
                ? Direction.UP
                : startCoords[1] < endCoords[1]
                ? Direction.DOWN
                : Direction.NONE,
        ];
        console.log(dir);
        const path = this.recurse(startCoords, dir, [], {
            carCoords,
            grid,
            move,
        });
        console.log(path);
        if (!path) {
            alert("no valid path");
            throw "no valid path";
        }
        let i = 0;
        const int = setInterval(() => {
            if (i >= path.length) {
                clearInterval(int);
            }
            move(path[i], 1);
            i++;
        }, 500);
    }

    private cache: Map<[number, number, boolean], Direction[]> = new Map();

    private recurse(
        pos: [number, number],
        dir: [Direction, Direction],
        path: Direction[],
        ctx: PathfinderContext,
        haveBeen: [number, number][] = [],
        ignoreBias = false
    ): Direction[] | void | false {
        if (pos[1] > ctx.grid.length || pos[0] > ctx.grid[pos[1]].length) {
            throw "out of bounds";
        }
        console.log(`${ignoreBias ? "unbiased " : ""}recurse`, pos, path);

        //#region sanity checks
        if (haveBeen.includes(pos)) {
            console.log("going in circles");
            return false;
        }

        // +10 just in case
        if (path.length > ctx.grid.length * ctx.grid[0].length + 10) {
            console.log("path too long");
            return false;
        }
        //#endregion

        const paths = this.calc(
            pos,
            dir,
            path[path.length - 1],
            ctx,
            ignoreBias
        );
        console.log(`${ignoreBias ? "unbiased " : ""}paths`, paths);
        if (paths.length === 0) {
            return;
        } else if (paths.length === 1) {
            if (
                this.spaceAt(this.calcMove(pos, paths[0], 1), ctx) ===
                CarSpace.end
            ) {
                return [...path, paths[0]];
            }
            const p = this.recurse(
                this.calcMove(pos, paths[0], 1),
                dir,
                [...path, paths[0]],
                ctx,
                [...haveBeen, pos]
            );
            if (p == void 0 && !ignoreBias) {
                // check unbiased
                console.log("going unbiased");
                return this.recurse(
                    pos,
                    dir,
                    path,
                    ctx,
                    [...haveBeen, pos],
                    true
                );
            } else {
                return p;
            }
        } else {
            const p: Direction[][] = paths
                .map((d) =>
                    this.recurse(
                        this.calcMove(pos, d, 1),
                        dir,
                        [...path, d],
                        ctx,
                        [...haveBeen, pos]
                    )
                )
                .filter((p1) => p1) as Direction[][];
            if (p.length === 0 && !ignoreBias) {
                // check unbiased
                console.log("going unbiased");
                return this.recurse(
                    pos,
                    dir,
                    path,
                    ctx,
                    [...haveBeen, pos],
                    true
                );
            } else {
                let shortest = p[0];
                p.slice(1).forEach((p1) => {
                    if (shortest.length > p1.length) {
                        shortest = p1;
                    }
                });
                return shortest;
            }
        }
    }

    private calc(
        pos: [number, number],
        dir: [Direction, Direction],
        cameFrom: Direction,
        ctx: PathfinderContext,
        ignoreBias = false
    ): Direction[] {
        //console.log("calc", pos, cameFrom);
        if (this.cache.has([...pos, ignoreBias])) {
            return this.cache.get([...pos, ignoreBias])!;
        }
        let dirs: Direction[] = [];
        let s,
            hasRoute = false;
        if (
            (s = this.spaceAt(this.calcMove(pos, dir[0], 1), ctx)) !==
                CarSpace.wall &&
            s !== void 0 &&
            this.oppositeDir(dir[0]) !== cameFrom
        ) {
            //console.log("can go", dir[0], s);
            hasRoute = true;
            if (s === CarSpace.end) {
                return [dir[0]];
            }
            dirs.push(dir[0]);
        }
        if (
            (s = this.spaceAt(this.calcMove(pos, dir[1], 1), ctx)) !==
                CarSpace.wall &&
            s !== void 0 &&
            this.oppositeDir(dir[1]) !== cameFrom
        ) {
            //console.log("can go", dir[1], s);
            hasRoute = true;
            if (s === CarSpace.end) {
                return [dir[1]];
            }
            dirs.push(dir[1]);
        }
        if (ignoreBias) {
            hasRoute = false;
            dirs = [];
        }
        if (!hasRoute) {
            if (
                (s = this.spaceAt(
                    this.calcMove(pos, this.oppositeDir(dir[0]), 1),
                    ctx
                )) !== CarSpace.wall &&
                s !== void 0 &&
                dir[0] !== cameFrom
            ) {
                if (s === CarSpace.end) {
                    return [this.oppositeDir(dir[0])];
                }
                dirs.push(this.oppositeDir(dir[0]));
            }
            if (
                (s = this.spaceAt(
                    this.calcMove(pos, this.oppositeDir(dir[1]), 1),
                    ctx
                )) !== CarSpace.wall &&
                s !== void 0 &&
                dir[1] !== cameFrom
            ) {
                if (s === CarSpace.end) {
                    return [this.oppositeDir(dir[1])];
                }
                dirs.push(this.oppositeDir(dir[1]));
            }
        }
        this.cache.set([...pos, ignoreBias], dirs);
        return dirs;
    }

    private calcMove(
        _pos: [number, number],
        dir: Direction,
        amount: number
    ): [number, number] {
        const pos = [_pos[0], _pos[1]];
        switch (dir) {
            case Direction.UP:
                pos[1] -= amount;
                break;
            case Direction.DOWN:
                pos[1] += amount;
                break;
            case Direction.RIGHT:
                pos[0] += amount;
                break;
            case Direction.LEFT:
                pos[0] -= amount;
                break;
        }
        return pos as any;
    }

    private spaceAt(pos: [number, number], ctx: PathfinderContext): CarSpace {
        return ctx.grid[pos[1]]?.[pos[0]];
    }

    private find(grid: CarSpace[][], type: CarSpace): [number, number] {
        const col = grid.findIndex((col) => col.includes(type));
        const row = grid[col].findIndex((t) => t === type);
        return [row, col];
    }

    private oppositeDir(dir: Direction) {
        return {
            [Direction.UP]: Direction.DOWN,
            [Direction.DOWN]: Direction.UP,
            [Direction.LEFT]: Direction.RIGHT,
            [Direction.RIGHT]: Direction.LEFT,
            [Direction.NONE]: Direction.NONE,
        }[dir];
    }
}

interface PathfinderContext {
    move: (direction: Direction, amount?: number) => CarCoords | void;
    grid: CarSpace[][];
    carCoords: CarCoords;
}
