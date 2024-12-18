import React from 'react';

interface SliderComponentProps {
  value: number;
  onChange: (newValue: number) => void;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="range"
      id="slider"
      name="slider"
      min="3"
      max="9"
      step="1"
      value={value}
      onChange={handleChange}
    />
  );
};

export default SliderComponent;
