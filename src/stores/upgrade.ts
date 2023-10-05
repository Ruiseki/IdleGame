import { ref } from 'vue';
import { defineStore } from 'pinia';

let upgradeList = ref([
    {
        'name': 'Linkedin Post',
        'level': '0',
        'coefBonus': '0.1',
        'moneyCoefBonus': '0',
        'coefDropRate': '0',
        'baseCost': '100',
        'coefCost': '2',
        'levelCap': '25',
        'itemName': 'Statue of Liberty',
        'quantity': '1'
    },
    {
        'name': 'Conference',
        'level': '0',
        'coefBonus': '0.2',
        'moneyCoefBonus': '0',
        'coefDropRate': '0',
        'baseCost': '500',
        'coefCost': '2',
        'levelCap': '25',
        'itemName': 'Big Ben',
        'quantity': '2'
    },
    {
        'name': 'Sponsor',
        'level': '0',
        'coefBonus': '0',
        'moneyCoefBonus': '0.3',
        'coefDropRate': '0',
        'baseCost': '1000',
        'coefCost': '2',
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
        'baseCost': '5000',
        'coefCost': '2',
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
        'baseCost': '10000',
        'coefCost': '2',
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
        'baseCost': '100',
        'coefCost': '2',
        'levelCap': '10',
        'itemName': 'Great Wall of China',
        'quantity': '7'
    },
])

export const useUpgrade = defineStore('upgrade', () => {
    function levelUp(upgradeName: string)
    {
        let index = upgradeList.value.findIndex(value => value.name == upgradeName)
        
        if(index != -1 && upgradeList.value[index] != undefined)
        {
            let newLevel = Number.parseInt( upgradeList.value[index].level ) + 1
            upgradeList.value[index].level = newLevel.toString()
            console.log(upgradeList.value[index]);
            
        }
    }

    return { upgradeList, levelUp };
})