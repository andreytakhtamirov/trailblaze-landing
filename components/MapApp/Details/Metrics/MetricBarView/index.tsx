import { kChartPalette1, kChartPalette2 } from "@/chart/colors";
import { MetricType } from "@/chart/metricsChart";
import { Route } from "@/types/route";
import { FormatHelper } from "@/util/formatHelper";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface MetricBarViewProps {
    route: Route;
    type: MetricType;
    onPreviewMetricType: (type: MetricType) => void;
}

const getColorForIndex = (index: number, type: MetricType): string => {
    const colorPalette =
        type === MetricType.surface ? kChartPalette1 : kChartPalette2;
    return colorPalette[index % colorPalette.length];
};

const MetricBarView: React.FC<MetricBarViewProps> = ({ route, type, onPreviewMetricType }) => {
    const title = type === MetricType.surface ? "Surface" : "Road Class";
    const metrics = type === MetricType.surface ? route.surfaceMetrics : route.roadClassMetrics;
    const maxItems = 3;

    return (
        <div className="px-2">
            <div className="text-base font-semibold">
                {title}
            </div>
            <div className="flex flex-col">
                {Object.entries(metrics)
                    .slice(0, maxItems)
                    .map(([metric, distance], index) => {
                        const itemWidth = `${(distance / route.distance) * 100}%`;
                        const accentColor = getColorForIndex(index, type);

                        return (
                            <div key={index} className="mt-2">
                                <div className="flex items-center">
                                    <div
                                        className="h-4 rounded"
                                        style={{
                                            width: itemWidth,
                                            backgroundColor: accentColor,
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span
                                        className="flex-1 truncate text-sm font-normal"
                                        title={metric}
                                    >
                                        {FormatHelper.toCapitalizedText(metric)}
                                    </span>
                                    <span className="flex-1 text-right text-sm font-normal">
                                        {FormatHelper.formatDistancePrecise(distance, false, true)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="justify-center flex flex-row ">
                <button
                    onClick={() => onPreviewMetricType(type)}
                    className="flex flex-row items-center text-blue-500 text-base"
                >
                    Preview
                    <MdOutlineKeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    );
};

export default MetricBarView;