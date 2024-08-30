import React from "react";
import {historyPurchase} from "../store/useStore";


const HistoryPurchase = ({icon, title, subtitle, currency, sum}: historyPurchase) => {
    return (
        <div>
            <div className='flex w-full items-center'>
                <div className="mt-[6px] relative w-[48px] h-[48px] flex justify-center items-center rounded-full "
                     style={{background: icon.bgColor}}>
                    <span className={'text-2xl'}>{icon.emoji}</span>
                </div>
                <div className='flex flex-col w-[180px] ml-4  gap-1'>
                    <span className='text-base'>{title}</span>
                    <span className='text-sm'>{subtitle}</span>
                </div>
                <div className='flex ml-auto'>
                    <div className=''><span className='text-base'
                                            style={{color: '#000000'}}>{sum}</span></div>
                    <div className=''><span className='text-base'
                                            style={{color: '#000000'}}>{currency}</span></div>
                </div>

            </div>
        </div>
    )
}

export default HistoryPurchase;