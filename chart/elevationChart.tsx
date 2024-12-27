import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Route } from "@/types/route";
import { FormatHelper } from "@/util/formatHelper";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

interface ElevationChartProps {
    route: Route;
}

const ElevationChart: React.FC<ElevationChartProps> = ({ route }) => {
    const elevationData = route.elevationMetrics;

    const labels = elevationData.map((_, index) =>
        FormatHelper.formatDistance((index / (elevationData.length - 1)) * route.distance, false, true)
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Elevation Profile",
                data: elevationData,
                backgroundColor: "rgba(8, 142, 255, 0.5)",
                borderColor: "rgba(8, 142, 255, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `Elevation: ${FormatHelper.formatDistancePrecise(
                            tooltipItem.raw,
                            false,
                            true
                        )}`;
                    },
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: "Distance",
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            y: {
                title: {
                    display: false,
                    text: "Elevation (m)",
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    callback: (value: number) => `${value} m`,
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
    };

    return (
        <div className="w-full h-25">
            <Line data={data} options={options} />
        </div>
    );
};

export default ElevationChart;
