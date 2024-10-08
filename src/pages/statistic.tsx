import React, {useEffect, useState} from 'react';
import AdditionalPost from "../components/AdditionalPost";
import {Bar, BarChart} from "recharts";
import ColorWrapper from "../components/ColorWrapper";
import {useNavigate, useParams} from "react-router-dom";
import {section, useStore} from "../store/useStore";
import useCurrentSection from "../hooks/useCurrentSection";

const Statistic = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const section = useCurrentSection(id || '1')

    const editSection = useStore(state => state.editSection)

    const [sectionData, setSectionData] = useState<section>()
    const [name, setName] = useState('')
    const [bgColor, setBgColor] = useState('')

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    useEffect(() => {
        setSectionData(section)
    }, [id])

    useEffect(() => {
        if(sectionData){
            setName(sectionData.name)
            setBgColor(sectionData.bgColor)
        }
    }, [sectionData]);

    const HandleSave = () => {
        if(sectionData){
            editSection({id:sectionData.id, bgColor, name, emoji:sectionData.emoji})
            navigate('/history')
        }
    }

    return (
        <div className={'h-screen relative'}>
            <h5 className='text-center py-5 font-bold text-lg'>{name}</h5>
            <div className={"w-[80px] h-[80px] mb-6 rounded-full mx-auto flex items-center justify-center"}
                 style={{background: '#EDDCD8'}}>
                <span className={'font-bold text-center text-[40px]'}>{sectionData?.emoji || ''}️</span>
            </div>
            <main className={`mx-8 `}>
                <AdditionalPost label={'Название'}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className='outline-none text-lg'
                           placeholder={"Развлечения"}/>
                </AdditionalPost>
                <AdditionalPost label={'Поменять цвет'}>
                    <ColorWrapper setBgColor={setBgColor}  defaultActiveColor={bgColor} colors={['#FF534270', 'rgba(217,154,10,0.44)', '#FFCF3370', 'rgba(31,133,0,0.44)', '#B0755370']}/>
                </AdditionalPost>
                <h5 className={'font-bold text-lg mb-5'}>Статистика</h5>
                <BarChart className={'w-full'} width={350} height={170} data={data}>
                    <Bar dataKey="uv" fill="#236F57" />
                </BarChart>
            </main>
            <div className=" fixed bottom-10 w-full px-4">
                <button onClick={() => HandleSave()} className='w-full  rounded-lg text-[#FFFFFF] text-lg font-bold py-3 bg-[#236F57]'>Сохранить
                </button>
            </div>

        </div>
    );
};

export default Statistic;