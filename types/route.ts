import { PolylineUtil } from "@/util/polyline";
import { decodeWithElevation } from "@/util/polylineDecode";
import { LayerSpecification, SourceSpecification } from "mapbox-gl";

type MetricDetails = [number, number, string];
type Polylines = Record<string, Array<Array<GeoJSON.Position>>>;

export class Route {
    public sourceId: string;
    public layerId: string;

    public lineLayer: LayerSpecification;
    public sourceLayer: SourceSpecification;

    public distance: number;
    public duration: number;
    public elevationMetrics: Array<number>;
    public coordinates: Array<GeoJSON.Position>;

    public surfaceMetrics: Record<string, number>;
    public surfacePolylines: Polylines;

    public roadClassMetrics: Record<string, number>;
    public roadClassPolylines: Polylines;

    constructor(sourceId: string, layerId: string, routeJson: any, isPrimary: boolean) {
        this.sourceId = sourceId;
        this.layerId = layerId;
        this.distance = routeJson.distance;
        this.duration = routeJson.time / 1000; // Graphhopper route duration is in ms.

        const coordinatesAndElevation = decodeWithElevation(routeJson.points);
        this.coordinates = coordinatesAndElevation.points;
        this.elevationMetrics = coordinatesAndElevation.elevations;

        this.lineLayer = PolylineUtil.getLineLayer(
            this.layerId,
            this.sourceId,
            isPrimary ? '#FF0000' : '#808080'
        );

        this.sourceLayer = PolylineUtil.getSourceLayer(
            this.coordinates,
        );

        this.surfaceMetrics = this.getMetrics(routeJson.details.surface, this.coordinates);
        this.roadClassMetrics = this.getMetrics(routeJson.details.road_class, this.coordinates);
        this.surfacePolylines = this.generatePolylinesForMetric(this.coordinates, routeJson.details.surface);
        this.roadClassPolylines = this.generatePolylinesForMetric(this.coordinates, routeJson.details.road_class);
    }

    private getMetrics(
        surfaceData: Array<MetricDetails>,
        coordinates: Array<GeoJSON.Position>
    ): Record<string, number> {
        const metrics: Record<string, number> = {};

        for (let i = 0; i < surfaceData.length; i++) {
            const [start, end, key] = surfaceData[i];

            if (!(key in metrics)) {
                metrics[key] = 0;
            }

            const distance =
                (this.distance / (coordinates.length - 1)) * (end - start);
            metrics[key] += distance;
        }

        // Sort metrics in decreasing distance order.
        const sortedMetrics = Object.fromEntries(
            Object.entries(metrics).sort(([, a], [, b]) => b - a)
        );

        return sortedMetrics;
    }

    private generatePolylinesForMetric(
        coordinates: Array<GeoJSON.Position>,
        metricDetails: Array<[number, number, string]>
    ): Polylines {
        const polylines: Polylines = {};

        for (const [startIndex, endIndex, type] of metricDetails) {
            const segment = coordinates.slice(startIndex, endIndex + 1);

            if (!(type in polylines)) {
                polylines[type] = [];
            }

            polylines[type].push(segment);
        }

        return polylines;
    }

    public setIsPrimary(isPrimary: boolean) {
        this.lineLayer = PolylineUtil.getLineLayer(
            this.layerId,
            this.sourceId,
            isPrimary ? '#FF0000' : '#808080'
        );
    } 
}
