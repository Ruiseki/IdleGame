import { ref } from 'vue';
import { defineStore } from 'pinia';
import { backup, setBackup, useCounterMoney, useCounterStore } from '@/stores/counter';

let upgradeListRef = [
    {
        'name': 'Linkedin Post',
        'level': '0',
        'coefBonus': '5',
        'moneyCoefBonus': '0',
        'coefDropRate': '0',
        'cost': '100',
        'levelCap': '25',
        'itemName': 'Statue of Liberty',
        'quantity': '1'
    },
    {
        'name': 'Conference',
        'level': '0',
        'coefBonus': '50',
        'moneyCoefBonus': '0',
        'coefDropRate': '0',
        'cost': '500',
        'levelCap': '25',
        'itemName': 'Big Ben',
        'quantity': '2'
    },
    {
        'name': 'Sponsor',
        'level': '0',
        'coefBonus': '100',
        'moneyCoefBonus': '0.3',
        'coefDropRate': '0',
        'cost': '1000',
        'levelCap': '20',
        'itemName': 'Eiffel Tower',
        'quantity': '1'
    },
    {
        'name': 'Propaganda',
        'level': '0',
        'coefBonus': '0.5',
        'moneyCoefBonus': '0',
        'coefDropRate': '0',
        'cost': '5000',
        'levelCap': '20',
        'itemName': 'Winter Palace',
        'quantity': '5'
    },
    {
        'name': 'Agil School',
        'level': '0',
        'coefBonus': '0.5',
        'moneyCoefBonus': '0.5',
        'coefDropRate': '0',
        'cost': '10000',
        'levelCap': '15',
        'itemName': 'Colosseum',
        'quantity': '5'
    },
    {
        'name': 'Corruption',
        'level': '0',
        'coefBonus': '1.5',
        'moneyCoefBonus': '-0.3',
        'coefDropRate': '0',
        'cost': '50000',
        'levelCap': '10',
        'itemName': 'Great Wall of China',
        'quantity': '7'
    },
]
let upgradeStr = localStorage.getItem('lastUpgrade')

if(upgradeStr == null)
    localStorage.setItem('lastUpgrade', JSON.stringify(upgradeListRef))
else
    upgradeStr = localStorage.getItem('lastUpgrade')

let upgradeList = upgradeStr != null ? ref(JSON.parse(upgradeStr)) : undefined

function saveUpgrade()
{
    localStorage.setItem('lastUpgrade', JSON.stringify(upgradeList.value))
}

export const useUpgrade = defineStore('upgrade', () => {
    let money = useCounterMoney();
    let counter = useCounterStore();

    function levelUp(upgradeName: string)
    {
        let index = upgradeList.value.findIndex((value: { name: string; }) => value.name == upgradeName)
        
        if(index != -1 && upgradeList.value[index] != undefined)
        {
            let backupClone = {...backup}
            if (Number.parseInt(backup.money) - Number.parseInt(upgradeList.value[index].cost) >= 0)
            {   
                let newLevel = Number.parseInt( upgradeList.value[index].level ) + 1
                upgradeList.value[index].level = newLevel.toString()

                counter.mainCoef += Number.parseFloat(upgradeList.value[index].coefBonus)
                money.moneyCoef += Number.parseFloat(upgradeList.value[index].moneyCoefBonus)
                money.money = (Number.parseFloat(backup.money) - Number.parseInt(upgradeList.value[index].cost))
                
                backupClone.mainCoef = counter.mainCoef
                backupClone.moneyCoef = money.moneyCoef
                backupClone.money = money.money.toString()
                setBackup(backupClone)
            }
            else return;
            upgradeList.value[index].cost = (Number.parseInt(upgradeList.value[index].cost) * 2).toString();
            saveUpgrade()
        }
    }

    return { upgradeList, levelUp };
})