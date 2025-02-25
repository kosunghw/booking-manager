import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ value, onChange }) => {
  const [color, setColor] = useState(value);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className='flex items-center space-x-2'>
      <HexColorPicker color={color} onChange={handleColorChange} />
      <input
        type='text'
        value={color}
        onChange={(e) => handleColorChange(e.target.value)}
        className='px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      />
    </div>
  );
};

export default ColorPicker;
