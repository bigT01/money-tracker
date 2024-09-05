import React from 'react';

type ColorButtonProps = {
    color: string,
    isActive: boolean,
    setActiveColor: (color: string) => void
}

const ColorButton = ({color, isActive, setActiveColor}: ColorButtonProps) => {
    return (
        <button onClick={() => setActiveColor(color)} className='w-[32px] h-[32px] rounded-full flex justify-center items-center' style={{background: color}}>
            {isActive && (
                <div className={'rounded-full border-[3px] border-white w-[22px] h-[22px]'}></div>
            )}
        </button>
    );
};

export default ColorButton;