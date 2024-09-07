import React, {useState} from 'react';
import ColorButton from "./colorButton";

type ColorWrapperProps = {
    colors : string[],
    defaultActiveColor: string
}
const ColorWrapper = ({colors, defaultActiveColor}: ColorWrapperProps) => {
    const [activeColor, setActiveColor] = useState<string>(defaultActiveColor)

    return (
        <div className={'flex gap-2'}>
            {colors.map((color) => (<ColorButton color={color} isActive={color === activeColor} setActiveColor={setActiveColor}/>))}
        </div>
    );
};

export default ColorWrapper;