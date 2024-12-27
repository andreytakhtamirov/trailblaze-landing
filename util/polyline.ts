import { LayerSpecification, SourceSpecification } from "mapbox-gl";

export abstract class PolylineUtil {

    public static getLineLayer(
        layerId: string,
        sourceId: string,
        color: string,
        options: { isMetric?: boolean } = {}
    ): LayerSpecification {
        const { isMetric = false } = options;

        const paint = isMetric
            ? {
                "line-color": "#FFFFFF",
                "line-opacity": 1,
                "line-width": 7,
                "line-border-width": 2,
                "line-border-color": "#FF5252",
            }
            : {
                "line-color": color,
                "line-width": 4,
            };

        return {
            id: layerId,
            type: "line",
            source: sourceId,
            paint,
            layout: {
                "line-cap": "round",
                "line-join": "round"
            }
        };
    }

    public static getSourceLayer(coordinates: Array<GeoJSON.Position>): SourceSpecification {
        return {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordinates
                },
            },
        }
    }

    public static getMultiLineSource(allCoordinates: Array<Array<GeoJSON.Position>>): SourceSpecification {
        const features: any = {
            type: "FeatureCollection",
            features: allCoordinates.map((coordinates) => ({
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: coordinates,
                },
            })),
        };

        return {
            type: "geojson",
            data: features,
        };
    }
}