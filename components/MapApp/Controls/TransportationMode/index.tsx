import Image from "next/image";
import React from "react";
import { IoBicycle } from "react-icons/io5";
import { FaWalking } from "react-icons/fa";

const TransportationMode: React.FC<{
  setSelectedActivity: React.Dispatch<React.SetStateAction<string | null>>;
  selectedActivity: string | null;
}> = ({ setSelectedActivity, selectedActivity }) => {
  const activityActions = ["walking", "cycling", "gravel_cycling"];
  const activityLabels = ["Walking", "Cycling", "Gravel Cycling"];
  const activityIcons = [
    <FaWalking />,
    <IoBicycle />,
    <Image
      width={20}
      height={20}
      src="/images/icon/icon-gravel-cycle.svg"
      alt="Gravel Cycling"
    />,
  ];

  return (
    <>
      <div className="rounded-xl border-2 p-1">
        <div className="grid w-full grid-cols-3 gap-2">
          {activityActions.map((activity, index) => (
            <label key={index} className="flex flex-1">
              <input
                type="radio"
                name="activity"
                value={activity}
                checked={selectedActivity === activity}
                onChange={() => setSelectedActivity(activity)}
                className="peer hidden"
              />
              <span className="flex w-full flex-grow items-center justify-center space-x-2 rounded-xl bg-white px-4 py-2 text-center text-xs font-medium text-black peer-checked:border-2 peer-checked:border-red-300">
                <span className="text-xl">{activityIcons[index]}</span>
                <span className="hidden flex-shrink text-center lg:block">
                  {activityLabels[index]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransportationMode;
