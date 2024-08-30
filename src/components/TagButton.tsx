import React from 'react';
import {useStore} from "../store/useStore";

type tagButtonProps = {
    label: string
}
const TagButton = ({label}: tagButtonProps) => {
    const activeTag = useStore(state => state.activeTag)
    const setActiveTag = useStore(state => state.setActiveTag)

    return (
        <button onClick={() => setActiveTag(label)}
                style={{background: activeTag === label ? '#236F57' : '', color: activeTag === label ? '#FFFFFF' : '',}}
                className='bg-[#F2F4F7] px-[10px] py-[6px] text-sm rounded-full'>
            {label}
        </button>
    );
};

export default TagButton;