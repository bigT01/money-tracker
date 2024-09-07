import React, {useEffect, useState} from 'react';
import ColorButton from "./colorButton";

type ColorWrapperProps = {
    colors : string[],
    defaultActiveColor: string,
    setBgColor: (color:string) => void
}
const ColorWrapper = ({colors, defaultActiveColor, setBgColor}: ColorWrapperProps) => {
    const [activeColor, setActiveColor] = useState<string>('')

    useEffect(() => {
        setActiveColor(defaultActiveColor)
    }, []);

    useEffect(() => {
        setBgColor(activeColor)
    }, [activeColor]);

    return (
        <div className={'flex gap-2'}>
            {colors.map((color) => (<ColorButton color={color} isActive={color === activeColor} setActiveColor={setActiveColor}/>))}
        </div>
    );
};

export default ColorWrapper;