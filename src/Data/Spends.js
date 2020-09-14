import { HIGH_LEVEL_TYPE_INCOME, HIGH_LEVEL_TYPE_COSTS } from './Types';

export let Spends = [
    { id: 0, sum: 210.02 , highType: HIGH_LEVEL_TYPE_INCOME, concreteTypeId: 2, date: "Sun Sep 13 2020 21:25:22 GMT+0300 (Moscow Standard Time)", comment: "Васёк Олег отдали долгииии" },
    { id: 1, sum: 500.65, highType: HIGH_LEVEL_TYPE_COSTS, concreteTypeId: 3, date: "Sun Sep 13 2020 21:25:22 GMT+0300 (Moscow Standard Time)", comment: "прокладки и мыло" },
    { id: 2, sum: 12000.00, highType: HIGH_LEVEL_TYPE_COSTS, concreteTypeId: 1, date: "Sun Sep 13 2020 21:25:22 GMT+0300 (Moscow Standard Time)", comment: "таксон да самарканда" },
    { id: 3, sum: 50.50, highType: HIGH_LEVEL_TYPE_INCOME, concreteTypeId: 2, date: "Sun Sep 13 2020 21:25:22 GMT+0300 (Moscow Standard Time)", comment: "сосед вернул за бутылку" },
]

export let getSpendsOrderedDESCByDate = () => {
    return Spends.slice().map(originalItem => {
        const date = new Date(originalItem.date);

        return { 
            id: originalItem.id,
            sum: originalItem.sum,
            highType: originalItem.highType,
            datePrintable: date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear(),
            dateAsDate: date,
            comment: originalItem.comment
        }
    }).sort((a, b) => b.dateAsDate - a.dateAsDate);
}