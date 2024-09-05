import React, {useState} from 'react';
import ColorButton from "./colorButton";

type ColorWrapperProps = {
    colors : string[]
}
const ColorWrapper = ({colors}: ColorWrapperProps) => {
    const [activeColor, setActiveColor] = useState<string>('')
    return (
        <div className={'flex gap-2'}>
            {colors.map((color) => (<ColorButton color={color} isActive={color === activeColor} setActiveColor={setActiveColor}/>))}
        </div>
    );
};

export default ColorWrapper;