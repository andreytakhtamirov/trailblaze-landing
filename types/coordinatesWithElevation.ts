export interface CoordinatesWithElevation {
    points: Array<GeoJSON.Position>;
    elevations: number[];
}

export class CoordinatesWithElevation {
    points: Array<GeoJSON.Position> = [];
    elevations: number[] = [];

    addPoint(coords: [number, number], elevation: number): void {
        this.points.push([coords[1], coords[0]]);
        this.elevations.push(elevation);
    }
}