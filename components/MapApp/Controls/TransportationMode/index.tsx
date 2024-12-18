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
            <div className="border-2 rounded-xl p-2">
                <div className="flex space-x-2">
                    {activityActions.map((activity, index) => (
                        <label key={index} className="flex-1">
                            <input
                                type="radio"
                                name="activity"
                                value={activity}
                                checked={selectedActivity === activity}
                                onChange={() => setSelectedActivity(activity)}
                                className="hidden peer"
                            />
                            <span className="w-full text-center bg-gray-500 peer-checked:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2">
                                <span className="text-2xl">{activityIcons[index]}</span>
                                <span>{activityLabels[index]}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TransportationMode;