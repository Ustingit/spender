export const HIGH_LEVEL_TYPE_INCOME = 'INCOME';
export const HIGH_LEVEL_TYPE_COSTS = 'COSTS';

export let incomeTypes = [
    { id: 0, name: "зарплата", default: true, comment: "сюда входит аванс, зарплата, премии или бонусы, которые вы получили от основного или дополнительных видов деятельности", type: HIGH_LEVEL_TYPE_INCOME },
    { id: 1, name: "долг", default: true, comment: "возврат отдолженных средств", type: HIGH_LEVEL_TYPE_INCOME },
    { id: 2, name: "пассивный доход", default: true, comment: "доходы, полученные от депозитов, инвестиций, и т.д.", type: HIGH_LEVEL_TYPE_INCOME },
    { id: 3, name: "подарок", default: true, comment: "средства, подаренные по какому-либо поводу.", type: HIGH_LEVEL_TYPE_INCOME }
]

export let costTypes = [
    { id: 0, name: "питание", default: true, comment: "расходы на питание.", type: HIGH_LEVEL_TYPE_INCOME },
    { id: 1, name: "хоз. расходы", default: true, comment: "расходы на хозяйственные нужды.", type: HIGH_LEVEL_TYPE_INCOME },
    { id: 2, name: "транспорт", default: true, comment: "расходы на транспорт, такси либо шэринг.", type: HIGH_LEVEL_TYPE_INCOME }
]

export let setNewList = (newList, type) => {
    if (type === HIGH_LEVEL_TYPE_INCOME) {
        incomeTypes = newList;
    }

    if (type === HIGH_LEVEL_TYPE_COSTS) {
        costTypes = newList;
    }
}

export let addItemToList = (newItem, type) => {
    if (type === HIGH_LEVEL_TYPE_INCOME) {
        incomeTypes = incomeTypes.concat(newItem);
    }

    if (type === HIGH_LEVEL_TYPE_COSTS) {
        costTypes = costTypes.concat(newItem);
    }
}