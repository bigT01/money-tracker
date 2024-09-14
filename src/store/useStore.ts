import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface datePurchase {
    data: string,
    dateInNumber: number,
    sum: number,
    currency: string
}

export interface section {
    id: string,
    bgColor: string,
    emoji: string,
    name: string
}

interface pieData {
    iconId: string,
    value: number,
}

interface wallet {
    name: string,
    sum: number
}

interface monthlySum {
    month: string,
    sum: number
}

export interface historyPurchase {
    icon: section,
    title: string,
    subtitle: string,
    sum: number,
    currency: string
}

interface purchase {
    datePurchase: datePurchase,
    historyPurchases: historyPurchase[]
}

interface IState {
    history: purchase[],
    sections: section[],
    activeSection: section | null,
    activeTag: string,
    wallets: wallet[],
    setActiveSection: (sectionProps: section) => void,
    setActiveTag: (activeTag: string) => void,
    setHistory: (title: string, subTitle: string, icon: section, sum: number, date: number) => void,
    addTag: (tag: string) => void,
    tags: string[],
    monthlyData: monthlySum[],
    pieChartData: pieData[],
    updateMonthlyData: (date: number, sum: number) => void,
    addPieData: (iconId: string, value: number) => void,
    editSection: (section: section) => void,
    addCard: (wallet: wallet) => void,
    editCard: (wallet: wallet) => void
}

export const useStore = create<IState>()(devtools((set) => ({
    history: [],
    sections: [
        {
            id: '1',
            bgColor: '#B0755370',
            name: 'Бизнес',
            emoji: '💼'
        },
        {
            id: '2',
            bgColor: '#FF534270',
            name: 'Развлечения',
            emoji: '🕹'
        },
        {
            id: '3',
            bgColor: 'rgba(217,154,10,0.44)',
            name: 'Транспорт',
            emoji: '🚖'
        },
        {
            id: '4',
            bgColor: '#FFCF3370',
            name: 'Бизнес',
            emoji: '💼'
        },
        {
            id: '5',
            bgColor: 'rgba(31,133,0,0.44)',
            name: 'Продукты',
            emoji: '🥕'
        },
    ],
    pieChartData: [],
    activeSection: null,
    activeTag: '',
    monthlyData: [],
    wallets: [],
    setActiveSection: (sectionProps) => set(() => ({activeSection: sectionProps}), false, 'setActiveSection'),
    setActiveTag: (activeTag) => set(() => ({activeTag}), false, 'setActiveTag'),
    setHistory: (title, subtitle, icon, sum, date) => set((state) => {
        // Check if the date exists in the history
        const existingPurchaseIndex = state.history.findIndex(purchase => purchase.datePurchase.dateInNumber === date);

        if (existingPurchaseIndex !== -1) {
            // If the date exists, add the new history purchase to the existing array
            const updatedHistory = [...state.history];
            updatedHistory[existingPurchaseIndex].historyPurchases.push({
                icon,
                title,
                subtitle,
                sum,
                currency: "₽"
            });
            updatedHistory[existingPurchaseIndex].datePurchase.sum += sum

            return {history: updatedHistory};

        } else {
            // If the date does not exist, create a new date entry with the history purchase
            const newPurchase = {
                datePurchase: {
                    data: new Date(date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}),
                    dateInNumber: date,
                    sum,
                    currency: "₽"
                },
                historyPurchases: [
                    {
                        icon,
                        title,
                        subtitle,
                        sum,
                        currency: "₽"
                    }
                ]
            };
            return {history: [...state.history, newPurchase]};
        }
    }, false, 'setHistory'),
    tags: ['Для FetchLab'], // Initial tags
    addTag: (tag: string) => set((state) => ({tags: [...state.tags, tag]})),
    updateMonthlyData: (date: number, sum: number) => set((state) => {
        const month = new Date(date).toLocaleString('ru-RU', {month: 'long', year: 'numeric'}); // Получаем месяц в формате "месяц, год"
        const existingMonthIndex = state.monthlyData.findIndex(entry => entry.month === month);

        if (existingMonthIndex !== -1) {
            // Если месяц уже есть, добавляем сумму
            const updatedMonthlyData = [...state.monthlyData];
            updatedMonthlyData[existingMonthIndex].sum += sum;
            return {monthlyData: updatedMonthlyData};
        } else {
            // Если месяца еще нет, создаем новую запись
            const newMonthEntry = {month, sum};
            return {monthlyData: [...state.monthlyData, newMonthEntry]};
        }
    }),
    addPieData: (iconId: string, value: number) => set((state) => {
        const pieChartDataT = state.pieChartData.filter(element => element.iconId === (state.activeSection?.id))

        if (pieChartDataT[0]) {
            const finding = state.pieChartData.findIndex(element => element.iconId === (state.activeSection?.id))
            const updatedDataT = [...state.pieChartData]
            updatedDataT[finding].value += value

            return {pieChartData: updatedDataT}
        } else {
            const newPieData = {
                iconId,
                value,
            }
            return {pieChartData: [...state.pieChartData, newPieData]}
        }
    }),
    editSection: (section) => set((state) => {
        const data = state.sections.map(sectionData => sectionData.id === section.id ? section : sectionData)
        return {sections: data}
    }),
    addCard: (wallet) => set((state) => {
        const data = [...state.wallets, wallet]
        return {wallets: data}
    }),
    editCard: (wallet) => set((state) => {
        const data = state.wallets.map((walletData) =>
            walletData.name === wallet.name
                ? {
                    name: wallet.name,
                    sum: walletData.sum + wallet.sum,
                }
                : walletData
        );
        return { wallets: data };
    }),
})))