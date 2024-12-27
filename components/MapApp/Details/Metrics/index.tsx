import { MetricType } from "@/chart/metricsChart";
import Dropdown from "../../Controls/Dropdown";
import { Route } from "@/types/route";
import ChartMetric from "./ChartMetric";
import { MdOutlineArrowBackIos } from "react-icons/md";
import MetricBarView from "./MetricBarView";
import ElevationChart from "@/chart/elevationChart";

interface MetricsProps {
    route: Route;
    selectedMetricType: MetricType | null;
    selectedMetric: string | null;
    onMetricChange: (metricType: MetricType | null, metric: string | null) => void;
}

const Metrics: React.FC<MetricsProps> = ({ route, selectedMetricType, selectedMetric, onMetricChange }) => {
    function getViewForOption() {
        switch (selectedMetricType) {
            case MetricType.elevation:
                return (<ElevationChart route={route} />);
            case MetricType.surface:
                return (<ChartMetric route={route} type={MetricType.surface} selectedMetric={selectedMetric} onMetricSelect={(metric: string) => {
                    onMetricChange(MetricType.surface, metric);
                }} />);
            case MetricType.roadClass:
                return (<ChartMetric route={route} type={MetricType.roadClass} selectedMetric={selectedMetric} onMetricSelect={(metric: string) => {
                    onMetricChange(MetricType.roadClass, metric);
                }} />);
        }
    }

    return (<>
        {selectedMetricType != null &&
            <div className="text-xl flex flex-row items-center justify-between">

                <div className="flex flex-row items-center text-blue-500" onClick={() => {
                    onMetricChange(null, null);
                }}>
                    <MdOutlineArrowBackIos />
                    Summary
                </div>

                <Dropdown metricType={selectedMetricType} onSelect={(metricType: MetricType) => { onMetricChange(metricType, null) }} />
            </div>
        }
        {selectedMetricType === null &&
            <div className="overflow-scroll max-h-[100px] sm:max-h-none sm:overflow-auto">
                <ElevationChart route={route} />
                <div className="grid grid-flow-col grid-cols-2 mx-2">
                    <div className="sm:max-w-[450px] md:max-w-[1000px] border-r-2">
                        <MetricBarView route={route} type={MetricType.surface} onPreviewMetricType={() => onMetricChange(MetricType.surface, null)
                        } />
                    </div>
                    <div className="sm:max-w-[450px] md:max-w-[1000px]">
                        <MetricBarView route={route} type={MetricType.roadClass} onPreviewMetricType={() => onMetricChange(MetricType.roadClass, null)
                        } />
                    </div>
                </div>
            </div>
        }
        <div className="overflow-clip">
            {getViewForOption()}
        </div>
    </>);
};

export default Metrics;