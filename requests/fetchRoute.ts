import { LngLat } from 'mapbox-gl'

export const fetchRoute = async (
    profile: string,
    waypoints: LngLat[],
    influence: number = 1000
) => {
    const authToken = process.env.NEXT_PUBLIC_APP_TOKEN;
    const base = "https://trailblaze.azurewebsites.net";
    const url = base + "/v1/routes/create-route-graphhopper";

    const payload = {
        profile,
        waypoints: waypoints.map((point) => JSON.stringify({ center: [point.lng, point.lat] })),
        influence,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "TRAILBLAZE-APP-TOKEN": `${authToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching route:", error);
        throw error;
    }
};
