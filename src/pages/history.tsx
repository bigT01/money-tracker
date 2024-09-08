import React, {useEffect, useState} from 'react';
import Tags from "../components/Tags";
import DateHistory from "../components/dateHistory";
import {Link} from "react-router-dom";
import {section, useStore} from "../store/useStore";
import {Cell, Pie, PieChart} from "recharts";
import CurrentSection from "../utils/currentSection";
import {IoIosArrowBack} from "react-icons/io";

const History = () => {
    const history = useStore(state => state.history)
    const sections = useStore(state => state.sections)
    const pieChartData = useStore(state => state.pieChartData)

    const [data, setData] = useState<any>([])
    const [colors, setColors] = useState<section[]>([])


    useEffect(() => {
        if(pieChartData[0]){
            setData([...pieChartData].map(element => ({value: element.value, name: CurrentSection(element.iconId, sections).name})))
            setColors([...pieChartData].map(element => CurrentSection(element.iconId, sections)))
        }
    }, [pieChartData]);
    return (
        <div className={'h-screen relative'}>
            <header className={'mx-8 box-border pt-14 pb-7'}>
                <div className='flex justify-between w-full items-center mb-8'>
                    <h5 className='font-bold text-lg text-black'>Траты за <span
                        className='text-primary-green'>июнь</span>
                    </h5>
                    <span className='font-light text-primary-green text-base'>65 099,76 ₽</span>
                </div>
                <div className='flex w-full justify-center mb-8'>
                    <div className='w-full h-[160px]'>
                        <PieChart className={'mx-auto'} width={250} height={160}>
                            <Pie
                                data={data}
                                cx={120}
                                cy={75}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry: any, index: any) => (
                                     <Cell string={CurrentSection(entry.iconId, sections)?.name} key={`cell-${index}`} fill={colors.map(section => section.bgColor)[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
                <div className="flex flex-wrap w-full gap-1">
                    {pieChartData.map((element) => (
                        <Tags id={element.iconId} key={element.iconId} label={CurrentSection(element.iconId, sections)?.name} color={CurrentSection(element.iconId, sections)?.bgColor} sum={element.value} textColor={'#000000'}/>
                    ))}
                </div>
            </header>
            <div className='w-full h-[1px] bg-primary-grey'>
            </div>
            <main className={'mx-8 py-6'}>
                <h4 className={'font-bold text-lg text-black'}>История</h4>
                {history.map(item => (
                    <DateHistory label={item.datePurchase.data} sum={item.datePurchase.sum} items={item.historyPurchases}/>
                ))}

            </main>
            <Link to={'/'} className={'fixed rounded-full bottom-10 left-5 bg-primary-green w-[64px] h-[44px] flex items-center justify-center'}>
                <IoIosArrowBack color={'#FFFFFF'} size={24}/>
            </Link>
            <Link to={'/transaction'} className={'fixed rounded-full bottom-10 right-5 bg-primary-green w-[64px] h-[44px] flex items-center justify-center'}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1V9M9 9V17M9 9H17M9 9H1" stroke="white" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </Link>
        </div>
    );
};

export default History;