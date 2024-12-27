import { kChartPalette1, kChartPalette2 } from "@/chart/colors";
import MetricsChart, { MetricType } from "@/chart/metricsChart";
import { Route } from "@/types/route"
import { FormatHelper } from "@/util/formatHelper";
import { useState } from "react";

interface ChartMetricProps {
    route: Route;
    onMetricSelect: (selectedMetric: string) => void;
    selectedMetric: string | null;
    type: MetricType;
}

const ChartMetric: React.FC<ChartMetricProps> = ({ route, onMetricSelect, selectedMetric, type }) => {
    const title = type === MetricType.surface ? "Surface" : "Road Class";
    const metrics = type === MetricType.surface ? route.surfaceMetrics : route.roadClassMetrics;
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const items = Object.entries(metrics);

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <div className="text-base font-semibold">
                    {title}
                </div>
                <div className="w-full">
                    <MetricsChart route={route} type={type} />
                </div>

                {items.map(([key, value], index) => {
                    const colorPalette = type === MetricType.surface ? kChartPalette1 : kChartPalette2;
                    const accentColor = colorPalette[index % colorPalette.length];
                    const isSelected = selectedMetric === key;

                    return (
                        <div key={key}>
                            <label className="metric-item flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="metric"
                                    value={key}
                                    checked={isSelected}
                                    onChange={() => onMetricSelect(key)}
                                    className="peer hidden"
                                />
                                <div
                                    className={`flex items-center gap-2 px-4 border rounded-full bg-gray-100 h-12`}
                                    style={{
                                        borderColor: isSelected ? accentColor : "transparent",
                                        borderWidth: "3px",
                                    }}
                                >
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: accentColor }}
                                    ></span>
                                    <div>
                                        <span className="text-sm font-medium">{key}</span>
                                        {isSelected && (
                                            <div className="text-sm font-medium">
                                                {FormatHelper.formatDistancePrecise(value, false, true)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ChartMetric;
