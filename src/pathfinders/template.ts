export default class TemplatePathfinder implements Pathfinder {
    readonly name = "Template Pathfinder";
    readonly description = "This is a template pathfinder.";
    Pathfind(
        move: (direction: Direction, amount?: number) => CarCoords | void,
        grid: CarSpace[][],
        carCoords: CarCoords
    ): boolean | void {
        alert(`${this.name} has been activated.`);
    }
}
