import { LngLat } from 'mapbox-gl';
import PointLabel, { PointLabelType } from './PointLabel';

interface LocationProps {
    isSettingOrigin: boolean | null;
    originPoint: LngLat | null;
    destinationPoint: LngLat | null;
    onClickOrigin: () => void;
    onClickDestination: () => void;
}

const Locations: React.FC<LocationProps> = ({ isSettingOrigin, originPoint, destinationPoint, onClickOrigin, onClickDestination }) => {
    return (
        <>
            <div className="flex flex-col gap-1 sm:gap-4 w-full items-stretch">
                <div className="flex-1">
                    <PointLabel
                        point={originPoint}
                        type={PointLabelType.origin}
                        isSettingOrigin={isSettingOrigin}
                        onClick={onClickOrigin}
                    />
                </div>

                <div className="flex-1">
                    <PointLabel
                        point={destinationPoint}
                        type={PointLabelType.destination}
                        isSettingOrigin={isSettingOrigin}
                        onClick={onClickDestination}
                    />
                </div>
            </div>
        </>
    );
}

export default Locations;
