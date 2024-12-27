import React from 'react';
import { BiStopwatch } from "react-icons/bi";
import { MdOutlineForest } from "react-icons/md";


interface SliderComponentProps {
  value: number;
  onChange: (newValue: number) => void;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Math.abs(Number(event.target.value)));
  };

  return (
    <span className="flex items-center justify-center gap-4">
      <p>Direct</p>
      <BiStopwatch className="text-3xl" />
      <div className="flex-grow relative">
        <input
          className="w-full bg-[#4a6f84] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#4a6f84] slider"
          type="range"
          id="slider"
          name="slider"
          min="-9"
          max="-3"
          step="1"
          value={-value}
          onChange={handleChange}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            background-color:#ffffff;
            border: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            appearance: none;
          }

          .slider::-moz-range-thumb {
            background-color: #ffffff;
            border: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
          }

          .slider::-ms-thumb {
            background-color: #ffffff;
            border: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
          }
      `}</style>
      </div>
      <MdOutlineForest className="text-3xl" />
      <p>Scenic</p>
    </span>
  );
};

export default SliderComponent;
