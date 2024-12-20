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
            <div className="flex flex-col gap-2 w-full xl:gap-4 md:flex-row md:gap-8">
                <PointLabel
                    point={originPoint}
                    type={PointLabelType.origin}
                    isSettingOrigin={isSettingOrigin}
                    onClick={onClickOrigin}
                />

                <PointLabel
                    point={destinationPoint}
                    type={PointLabelType.destination}
                    isSettingOrigin={isSettingOrigin}
                    onClick={onClickDestination}
                />
            </div>
        </>
    );
}

export default Locations;
