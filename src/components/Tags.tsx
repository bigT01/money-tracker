import React from 'react';
import {Link} from "react-router-dom";

type TagsProps = {
    id: string,
    label: string,
    sum: number,
    color: string,
    textColor: string
}
const Tags = ({id, label, sum, color, textColor}:TagsProps) => {
    return (
        <Link to={`/statistic/${id}`} className='rounded-full px-3 py-2 flex gap-1' style={{background: color}}>
            <span className='text-sm' style={{color: textColor}}>{label}</span>
            <span className='text-sm font-semibold' style={{color: textColor}}>{sum} ₽</span>
        </Link>
    );
};

export default Tags;