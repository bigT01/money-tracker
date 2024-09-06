import React, {useEffect, useState} from 'react';
import Category from "../components/Category";
import AdditionalPost from "../components/AdditionalPost";
import TagButton from "../components/TagButton";
import {Link, useNavigate} from "react-router-dom";
import {useStore} from "../store/useStore";

const Transaction = () => {
    const navigate = useNavigate()
    const sections = useStore(state => state.sections)
    const tags = useStore(state => state.tags)
    const addTag = useStore(state => state.addTag)
    const activeSection = useStore(state => state.activeSection)
    const activeTag = useStore(state => state.activeTag)
    const setHistory = useStore(state => state.setHistory)
    const addPieData = useStore(state => state.addPieData)

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [tagName, setTagName] = useState('')
    const [date, setDate] = useState(0)
    const [sum, setSum] = useState(0)
    const [isClicked, setIsClicked] = useState(false)


    useEffect(() => {
        if(activeSection){
            setTitle(activeSection.name)
        }
    }, [activeSection])

    useEffect(() => {
        if(activeTag){
            setSubtitle(activeTag)
        }
    }, [activeTag])

    const handleDateChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value).getTime()
        setDate(date)
    }

    const HandleClick = () => {
        setHistory(title, subtitle, activeSection || {id: '0',name: 'bb', emoji: 's', bgColor: '#000000'}, sum, date)
        addPieData(activeSection?.id || 'hello', sum)
        navigate('/history')
    }

    const handleAddTag = () => {
        addTag(tagName)
        setIsClicked(false)
    }

    return (
        <div className={'h-screen relative'}>
            {isClicked && (
                <div className='absolute w-full h-full bg-[#00000050] flex justify-center items-center'>
                    <div className={'w-[70%] h-[250px] bg-white relative rounded-xl px-3 py-4'}>
                        <AdditionalPost label={'Названия метки'}>
                            <input onChange={e => setTagName(e.target.value)} type="text" className='outline-none text-lg' placeholder={"Yandex"}/>
                        </AdditionalPost>

                        <button
                            onClick={() => handleAddTag()}
                                style={{background: '#236F57', color: '#FFFFFF' }}
                                className='absolute bottom-5 w-[90%] bg-[#F2F4F7] px-[10px] py-[6px] text-sm rounded-full'>
                            Добавить метку
                        </button>
                    </div>
                </div>
            )}
            {activeSection ? (
                <header className={'mx-8 flex pt-4 pb-7 items-center gap-3'}>
                    <div style={{backgroundColor: activeSection.bgColor}}
                         className={'w-[48px] h-[48px] flex bg-primary-green rounded-full justify-center items-center'}>
                        {activeSection.emoji}
                    </div>
                    <h5 className="font-bold text-lg">{activeSection.name}</h5>
                </header>
            ) : null}

            <main className={`mx-8 ${activeSection ? '' : 'mt-10'}`}>
                <div className={'grid w-full grid-cols-4 gap-5 mb-8'}>
                    {sections.map(section => (
                        <Category id={section.id} label={section.name} icon={section.emoji} bgIcon={section.bgColor}/>
                    ))}
                </div>
                <AdditionalPost label={'Комментарий'}>
                    <input type="text" className='outline-none text-lg' placeholder={"Супермаркет"}/>
                </AdditionalPost>
                <AdditionalPost label={'Метки'}>
                    <div className='flex flex-wrap gap-3'>
                        {tags.map((element) => (
                            <TagButton key={element} label={element}/>
                        ))}
                        <button onClick={() => setIsClicked(true)} className={'px-[10px] py-[6px] text-[#247158] rounded-full'} style={{border: '1px solid #D3E3DE'}}>
                            Добавить метку
                        </button>
                    </div>
                </AdditionalPost>
                <AdditionalPost label={'Дата'}>
                    <input type="date" onChange={(e) => handleDateChange(e)}/>
                </AdditionalPost>
            </main>
            <div className='w-full fixed bottom-0 h-[160px] rounded-t-2xl bg-primary-green'>
                <div className="mx-8 pt-6">
                    <p className={'text-sm text-[#FFFFFF50] mb-1'}>Сумма</p>
                    <div className='flex justify-between items-center'>
                        <input className="text-white font-medium text-3xl bg-transparent border-none w-[100px] outline-none" type="number" onChange={(e) => setSum(Number(e.target.value))}/>
                        <button onClick={() => {HandleClick()}}
                              className={'rounded-full bg-[#ffffff50] w-[64px] h-[44px] flex items-center justify-center'}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M10.4697 7.46967C10.7626 7.17678 11.2374 7.17678 11.5303 7.46967L17.5303 13.4697C17.8232 13.7626 17.8232 14.2374 17.5303 14.5303L11.5303 20.5303C11.2374 20.8232 10.7626 20.8232 10.4697 20.5303C10.1768 20.2374 10.1768 19.7626 10.4697 19.4697L15.9393 14L10.4697 8.53033C10.1768 8.23744 10.1768 7.76256 10.4697 7.46967Z"
                                      fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;