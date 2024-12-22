import { CoordinatesWithElevation } from "@/types/coordinatesWithElevation";

// Expanded on https://github.com/mapbox/polyline/blob/master/src/polyline.js to include decoding `elevation`.
export function decodeWithElevation(str: string, precision: number = 5): CoordinatesWithElevation {
    const coordinatesWithElevation = new CoordinatesWithElevation();
    var index = 0,
        lat = 0,
        lng = 0,
        elevation = 0,
        shift = 0,
        result = 0,
        byte: number | null = null,
        latitude_change,
        longitude_change,
        elevation_change,
        factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

    while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 1;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result += (byte & 0x1f) * shift;
            shift *= 32;
        } while (byte >= 0x20);

        latitude_change = (result & 1) ? ((-result - 1) / 2) : (result / 2);

        shift = 1;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result += (byte & 0x1f) * shift;
            shift *= 32;
        } while (byte >= 0x20);

        longitude_change = (result & 1) ? ((-result - 1) / 2) : (result / 2);

        shift = 1;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result += (byte & 0x1f) * shift;
            shift *= 32;
        } while (byte >= 0x20);

        elevation_change = (result & 1) ? ((-result - 1) / 2) : (result / 2);

        lat += latitude_change;
        lng += longitude_change;
        elevation += elevation_change;

        coordinatesWithElevation.addPoint([lat / factor, lng / factor], elevation / 100);
    }

    return coordinatesWithElevation;
}
