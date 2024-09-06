import React, {useEffect} from 'react';
import {useStore} from "../store/useStore";

type categoryProps = {
    icon: string,
    bgIcon: string,
    label: string,
    id: string
}
const Category = ({icon, id, bgIcon, label}: categoryProps) => {
    const setActiveSection = useStore(state => state.setActiveSection)
    return (
        <div className='flex flex-col items-center' onClick={() => {
            setActiveSection({ id: id, name: label, bgColor: bgIcon, emoji: icon})
        }}>
            <div style={{backgroundColor: bgIcon}}
                 className={'w-[48px] bg-[#B0755370] h-[48px] flex bg-primary-green rounded-full justify-center items-center'}>
                {icon}
            </div>
            <p className={'text-xs'}>{label}</p>
        </div>
    );
};

export default Category;