import React, {useState} from 'react';
import './App.css';
import {SlUser} from "react-icons/sl";
import DateHistory from "./components/dateHistory";
import {useStore} from "./store/useStore";
import {Link} from "react-router-dom";
import {IoIosWallet} from "react-icons/io";
import {GrHistory} from "react-icons/gr";
import AdditionalPost from "./components/AdditionalPost";
import TagButton from "./components/TagButton";

function App() {
    const history = useStore(state => state.history)

    const [activeWallet, setActiveWallet] = useState('')

    const [isClicked, setIsClicked] = useState(false)
    const [isCardAdded, setIsCardAdded] = useState(false)

    return (
        <div className={'h-screen relative'}>
            {isClicked && (
                <div className='absolute z-50 w-full h-full bg-[#00000050] flex justify-center items-center'>
                    <div className={'w-[70%] h-[300px] bg-white relative rounded-xl px-3 py-4'}>
                        <div className={'flex flex-wrap gap-2 mb-4'}>
                            <button onClick={() => {
                                setActiveWallet('QIWI Wallet')
                                setIsCardAdded(false)
                            }}
                                    style={{
                                        background: activeWallet === 'QIWI Wallet' ? '#236F57' : '',
                                        color: activeWallet === 'QIWI Wallet' ? '#FFFFFF' : '',
                                    }}
                                    className='bg-[#F2F4F7] px-[10px] py-[6px] text-sm rounded-full'>
                                QIWI Wallet
                            </button>
                            <button onClick={() => {
                                setIsCardAdded(true)
                                setActiveWallet('')
                            }}
                                    className={'px-[10px] py-[6px] text-[#247158] rounded-full'}
                                    style={{border: '1px solid #D3E3DE'}}>
                                Добавить карту
                            </button>
                        </div>
                        {isCardAdded && (
                            <AdditionalPost label={'Названия карты'}>
                                <input type="text" className='outline-none text-lg' placeholder={"Yandex card"}/>
                            </AdditionalPost>
                        )}
                        <AdditionalPost label={'Сумма'}>
                            <input type="number" className='outline-none text-lg' placeholder={"1000"}/>
                        </AdditionalPost>
                        <button
                            onClick={() => setIsClicked(false)}
                            style={{background: '#236F57', color: '#FFFFFF'}}
                            className='absolute bottom-5 w-[90%] bg-[#F2F4F7] px-[10px] py-[6px] text-sm rounded-full'>
                            {isCardAdded ? 'Добавть карту' :  'Обновить сумму'}
                        </button>
                    </div>
                </div>
            )}
            <header className={'h-[294px] w-full relative bg-primary-green rounded-b-3xl px-8 mb-20'}>
                <div className='flex justify-between pt-10 items-center mb-10'>
                    <h5 className='font-bold text-white text-lg'>Бюджет</h5>
                    <SlUser size={28} color={'#FFFFFF'}/>
                </div>
                <h5 className={'font-bold text-lg text-white mb-4'}><span
                    className={'opacity-50'}>Доступно</span> сегодня</h5>
                <h4 className={'font-semibold text-3xl text-white'}>–185.12 ₽ </h4>
                <p className={'font-base text-md text-white'}>из 2450.00 ₽</p>

                <div className={'left-0 px-10 w-[90%] h-[165px] overflow-scroll absolute bottom-[-110px] flex'}>
                    <div className='w-[240px] block h-[102px] bg-[#FFFFFF] rounded-2xl shadow-2xl px-[16px] py-3'>
                        <p className={'text-[13px] mb-4'}>QIWI Wallet</p>
                        <h5 className={'font-semibold text-lg '} style={{lineHeight: '18px'}}>12 900 ₽</h5>
                        <p className={'text-[13px]'}>из 15 000 ₽</p>
                    </div>
                    {/*<div className='w-[240px] block box-border  h-[102px] bg-[#FFFFFF] rounded-2xl shadow-2xl px-[16px] py-3'>*/}
                    {/*    <p className={'text-[13px] mb-4'}>QIWI Wallet</p>*/}
                    {/*    <h5 className={'font-semibold text-lg '} style={{lineHeight: '18px'}}>12 900 ₽</h5>*/}
                    {/*    <p className={'text-[13px]'}>из 15 000 ₽</p>*/}
                    {/*</div>*/}
                    {/*<div className='w-[240px]  h-[102px] bg-[#FFFFFF] rounded-2xl shadow-2xl px-[16px] py-3'>*/}
                    {/*    <p className={'text-[13px] mb-4'}>QIWI Wallet</p>*/}
                    {/*    <h5 className={'font-semibold text-lg '} style={{lineHeight: '18px'}}>12 900 ₽</h5>*/}
                    {/*    <p className={'text-[13px]'}>из 15 000 ₽</p>*/}
                    {/*</div>*/}
                </div>
            </header>
            <main className={'px-8'}>
                <div className={'flex justify-between items-center'}>
                    <h4 className={'font-bold text-lg text-black'}>Траты за <span
                        className={'text-primary-green'}>июнь</span></h4>
                    <p className={'text-primary-green text-[15px]'}>65 099,76 ₽</p>
                </div>
                {history.map(item => (
                    <DateHistory label={item.datePurchase.data} sum={item.datePurchase.sum}
                                 items={item.historyPurchases}/>
                ))}
            </main>
            <button onClick={() => setIsClicked(true)} className={'fixed rounded-full bottom-10 left-5 bg-primary-green w-[64px] h-[44px] flex items-center justify-center'}>
                <IoIosWallet color={'#FFFFFF'} size={24}/>
            </button>
            <Link to={'/history'} className={'fixed rounded-full bottom-10 right-5 bg-primary-green w-[64px] h-[44px] flex items-center justify-center'}>
                <GrHistory color={'#FFFFFF'} size={24}/>
            </Link>
        </div>
    );
}

export default App;
