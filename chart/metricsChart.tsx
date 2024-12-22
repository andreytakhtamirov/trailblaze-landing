import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Route } from "@/types/route";
import { kChartPalette1, kChartPalette2 } from "./colors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export enum MetricType {
    surface,
    roadClass,
}

interface MetricsChartProps {
    route: Route;
    type: MetricType;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ route, type }) => {
    const metrics = type === MetricType.surface ? route.surfaceMetrics : route.roadClassMetrics;
    const metricNames = Object.keys(metrics);

    const colorPalette = type === MetricType.surface ? kChartPalette1 : kChartPalette2;

    const datasets = metricNames.map((name, index) => ({
        label: name,
        data: [metrics[name]],
        backgroundColor: colorPalette[index % colorPalette.length],
        borderColor: colorPalette[index % colorPalette.length].replace('0.7', '1'),
        borderWidth: 1,
        stack: "stack1",
    }));

    const data = {
        labels: [type === MetricType.surface ? "Surface Type" : "Road Class"],
        datasets: datasets,
    };

    const options: any = {
        responsive: true,
        indexAxis: "y",
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                max: route.distance,
            },
            y: {
                stacked: true,
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            title: {
                display: false,
                text: "Stacked Bar Chart of Metrics and Distances",
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };


    return <div className="w-full h-15">
        < Bar data={data} options={options} />
    </div >
};

export default MetricsChart;
