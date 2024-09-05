import React from 'react';

type ColorButtonProps = {
    color: string,
    isActive: boolean
}

const ColorButton = ({color, isActive}: ColorButtonProps) => {
    return (
        <button className='w-[32px] h-[32px] rounded-full flex justify-center items-center' style={{background: color}}>
            <div className={'rounded-full border-[3px] border-white w-[22px] h-[22px]'}></div>
        </button>
    );
};

export default ColorButton;