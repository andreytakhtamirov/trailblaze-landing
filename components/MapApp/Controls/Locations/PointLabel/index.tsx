import classNames from "classnames";
import { LngLat } from "mapbox-gl";
import { MdOutlineEdit } from "react-icons/md";

export enum PointLabelType {
    origin,
    destination
}

interface PointLabelProps {
    type: PointLabelType;
    point: LngLat | null;
    isSettingOrigin: boolean | null;
    onClick: () => void;
}

const PointLabel: React.FC<PointLabelProps> = ({ type, point, isSettingOrigin, onClick }) => {

    function label(): string {
        switch (type) {
            case PointLabelType.origin:
                return "Origin";
            case PointLabelType.destination:
                return "Destination";
        }
    }

    function isActive(): boolean {
        switch (type) {
            case PointLabelType.origin:
                return isSettingOrigin === true;
            case PointLabelType.destination:
                return isSettingOrigin === false;
        }
    }

    function colorForType(): string {
        switch (type) {
            case PointLabelType.origin:
                return "red-400";
            case PointLabelType.destination:
                return "blue-400";
        }
    }

    function markerToString(point: LngLat | null) {
        if (!point) {
            return isActive() ? "Click on map to select" : "Click to change";
        } else if (isActive()) {
            return "Click on map to change"
        }

        const { lng, lat } = point;
        return `${lng.toFixed(3)}, ${lat.toFixed(3)}`;
    }

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col lg:grid lg:grid-flow-cols lg:grid-cols-2 gap-2 xs:gap-0.5 h-full justify-between w-full">
                    <p className="font-medium hidden sm:block flex-shrink-0 content-center">
                        {label()}
                    </p>

                    <div
                        className={classNames("border-2 rounded-lg flex-1 w-full", {
                            [`border-${colorForType()}`]: isActive(),
                        })}
                        onClick={onClick}
                    >
                        <div className="px-2 sm:px-4 w-full flex flex-row items-center gap-4 justify-between h-full py-0.5 sm:py-1">
                            <div
                                className={classNames(`bg-${colorForType()} h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 rounded-full`)}
                            />
                            <span className="flex-grow flex-shrink w-fit leading-5 overflow-ellipsis line-clamp-1">{markerToString(point)}</span>
                            <MdOutlineEdit
                                className={classNames("text-2xl", { "invisible": isActive() })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PointLabel;