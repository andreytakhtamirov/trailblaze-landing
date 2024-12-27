import React, { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { MdOutlineShowChart, MdOutlineLocationCity } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MetricType } from "@/chart/metricsChart";

interface DropdownProps {
    metricType: MetricType;
    onSelect: (option: MetricType) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ metricType, onSelect }) => {
    const optionsIcons = [<MdOutlineShowChart />, <BiWorld />, <MdOutlineLocationCity />];
    const options = ["Elevation", "Surface", "Road Class"];
    const types = [MetricType.elevation, MetricType.surface, MetricType.roadClass];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(options[types.indexOf(metricType)]);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (index: number) => {
        setSelectedOption(options[index]);
        onSelect(types[index]);
        setIsOpen(false);
    };

    return (
        <div className="relative w-48">
            <button
                onClick={toggleDropdown}
                className="w-full px-4 py-2 text-black border-2 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600  flex-row flex items-center gap-2 text-lg justify-between"
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
            >
                <div>
                    {optionsIcons[options.indexOf(selectedOption)]}
                </div>
                {selectedOption || "Select Option"}
                <div>
                    <IoMdArrowDropdown />
                </div>
            </button>

            {isOpen && (
                <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {options.map((option, index) => (
                        <li
                            key={option}
                            onClick={() => selectOption(index)}
                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-blue-100 focus:outline-none flex-row flex items-center gap-8 text-lg"
                        >
                            <div>
                                {optionsIcons[index]}
                            </div>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
