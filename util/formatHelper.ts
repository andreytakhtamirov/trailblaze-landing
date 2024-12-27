import convert from 'convert-units';

export abstract class FormatHelper {
    static formatDuration(durationSeconds: number | null): string {
        if (durationSeconds === null) {
            return 'NaN';
        }

        const durationSecondsInt = Math.floor(durationSeconds);
        const hours = Math.floor(durationSecondsInt / 3600);
        const minutes = Math.floor((durationSecondsInt % 3600) / 60);
        const seconds = durationSecondsInt % 60;

        let formattedDuration: string;
        if (hours > 0) {
            formattedDuration = `${hours} hours ${minutes.toString().padStart(2, '0')} minutes`;
        } else if (minutes > 0) {
            formattedDuration = `${minutes} minutes`;
        } else {
            formattedDuration = `${seconds} seconds`;
        }

        return formattedDuration;
    }

    static formatDistance(distanceMeters: number | null, noRemainder = false, isMetric: boolean): string {
        if (isMetric) {
            return this._formatDistanceMetric(distanceMeters, noRemainder);
        } else {
            return this._formatDistanceImperial(distanceMeters, noRemainder);
        }
    }

    static formatDistancePrecise(distanceMeters: number | null, noRemainder = false, isMetric: boolean): string {
        if (isMetric) {
            return this._formatDistancePreciseMetric(distanceMeters, noRemainder);
        } else {
            return this._formatDistancePreciseImperial(distanceMeters, noRemainder);
        }
    }

    // Metric format
    private static _formatDistanceMetric(distanceMeters: number | null, noRemainder = false): string {
        return `${distanceMeters !== null ? (distanceMeters / 1000).toFixed(noRemainder ? 0 : 2) : 0} km`;
    }

    private static _formatDistancePreciseMetric(distanceMeters: number | null, noRemainder = false): string {
        if (distanceMeters === null || distanceMeters === 0) {
            return "0 m";
        }

        if (distanceMeters < 1000) {
            return `${distanceMeters.toFixed(0)} m`;
        } else {
            return `${(distanceMeters / 1000).toFixed(noRemainder ? 0 : 2)} km`;
        }
    }

    // Imperial format
    private static _formatDistanceImperial(distanceMeters: number | null, noRemainder = false): string {
        const distanceMiles = distanceMeters ? convert(distanceMeters).from('m').to('mi') : 0;
        return `${distanceMiles.toFixed(noRemainder ? 0 : 2)} mi`;
    }

    private static _formatDistancePreciseImperial(distanceMeters: number | null, noRemainder = false): string {
        if (distanceMeters === null || distanceMeters === 0) {
            return "0 ft";
        }

        const distanceFeet = distanceMeters ? convert(distanceMeters).from('m').to('ft') : 0;

        if (distanceFeet < 500) {
            return `${distanceFeet.toFixed(0)} ft`;
        } else {
            const distanceMiles = convert(distanceFeet).from('ft').to('mi');
            return `${distanceMiles.toFixed(noRemainder ? 0 : 2)} mi`;
        }
    }

    public static toCapitalizedText(s: string): string {
        const words = s.split('_');
        let capitalizedText = '';

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word.length > 0) {
                const capitalizedWord = `${word[0].toUpperCase()}${word.substring(1)}`;
                capitalizedText += capitalizedWord;
                if (i < words.length - 1) {
                    capitalizedText += ' ';
                }
            }
        }

        return capitalizedText;
    }
}
