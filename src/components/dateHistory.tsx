import React from 'react';
import {historyPurchase} from "../store/useStore";
import HistoryPurchase from "./historyPurchase";

type DateHistoryProps = {
    label: string,
    sum: number,
    items: historyPurchase[]
}
const DateHistory = ({label, sum, items}: DateHistoryProps) => {
    return (
        <div className={'mt-4'}>
            <div className='flex justify-between mb-5 items-center text-primary-grey text-sm font-light'>
                <span>{label}</span>
                <span>{sum} ₽</span>
            </div>
            <div className='flex flex-col gap-3'>
                {items.map((item) => (
                    <HistoryPurchase key={item.subtitle} icon={item.icon} title={item.title} subtitle={item.subtitle} sum={item.sum} currency={item.currency}/>
                ))}
            </div>

        </div>
    );
};

export default DateHistory;