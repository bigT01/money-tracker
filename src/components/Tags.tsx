import React from 'react';

type TagsProps = {
    label: string,
    sum: number,
    color: string,
    textColor: string
}
const Tags = ({label, sum, color, textColor}:TagsProps) => {
    return (
        <div className='rounded-full px-3 py-2 flex gap-1' style={{background: color}}>
            <span className='text-sm' style={{color: textColor}}>{label}</span>
            <span className='text-sm font-semibold' style={{color: textColor}}>{sum} ₽</span>
        </div>
    );
};

export default Tags;