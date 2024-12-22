import { FaWalking, FaBicycle, FaMountain } from 'react-icons/fa';


const TransportationMode: React.FC<{
    setSelectedActivity: React.Dispatch<React.SetStateAction<string | null>>;
    selectedActivity: string | null;
}> = ({ setSelectedActivity, selectedActivity }) => {
    const activityActions = ["walking", "cycling", "gravel_cycling"];
    const activityLabels = ["Walking", "Cycling", "Gravel Cycling"]
    const activityIcons = [<FaWalking />, <FaBicycle />, <FaMountain />];

    return (
        <>
            <div className="border-2 rounded-xl p-1">
                <div className="grid gap-2 w-full grid-cols-3">
                    {activityActions.map((activity, index) => (
                        <label key={index} className="flex flex-1 sm:min-w-[120px]">
                            <input
                                type="radio"
                                name="activity"
                                value={activity}
                                checked={selectedActivity === activity}
                                onChange={() => setSelectedActivity(activity)}
                                className="hidden peer"
                            />
                            <span className="w-full text-center bg-white peer-checked:border-2 peer-checked:border-red-300 text-black font-medium text-xs py-2 px-4 rounded-xl flex items-center justify-center space-x-2 flex-grow">
                                <span className="text-xl">{activityIcons[index]}</span>
                                <span className="text-center flex-shrink hidden sm:block">{activityLabels[index]}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TransportationMode;