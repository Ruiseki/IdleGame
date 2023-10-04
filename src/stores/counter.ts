import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {

  let backupQty: any = localStorage.getItem('quantity');
  if (backupQty == null) backupQty = '0';
  backupQty = Number.parseInt(backupQty);

  let backupCoef: any = localStorage.getItem('coefQty');
  if (backupCoef == null) backupCoef = '1';
  backupCoef = Number.parseInt(backupCoef);

  let backupCoefClick: any = localStorage.getItem('coefClick');
  if (backupCoefClick == null) backupCoefClick = '1';
  backupCoefClick = Number.parseInt(backupCoefClick);

  const quantity = ref(backupQty)
  const mainCoef = ref(backupCoef)
  const clickCoef = ref(backupCoefClick)

  setInterval(() => {
    quantity.value += 1 * mainCoef.value
    localStorage.setItem('quantity', quantity.value.toString())
    localStorage.setItem('coefQty', mainCoef.value.toString())
    localStorage.setItem('coefClick', clickCoef.value.toString())
    
  }, 5000)

  function mainClick()
  {
      quantity.value += 1 * clickCoef.value
      localStorage.setItem('quantity', quantity.value.toString())
      localStorage.setItem('coefQty', mainCoef.value.toString())
      localStorage.setItem('coefClick', clickCoef.value.toString())
  }

  return { quantity, mainCoef, clickCoef, mainClick }
})

export const useCounterMoney = defineStore('counterMoney', () => {

    let backupMoney: any = localStorage.getItem('money');
    if (backupMoney == null) backupMoney = '0';
    backupMoney = Number.parseInt(backupMoney);

    let backupMoneyCoef: any = localStorage.getItem('moneyCoef');
    if (backupMoneyCoef == null) backupMoneyCoef = '1';
    backupMoneyCoef = Number.parseInt(backupMoneyCoef);

    const money = ref(backupMoney)
    const moneyCoef = ref(backupMoneyCoef)
    
    function mainClick( students: number)
    {
        money.value += students * moneyCoef.value
        localStorage.setItem('money', money.value.toString())
        localStorage.setItem('moneyCoef', moneyCoef.value.toString())
    }
  
    return { money, moneyCoef, mainClick }
  })


export const useCounterInventory = defineStore('counterInventory', () => {

    const inventory_labels = [ "Eiffel Tower", "Statue of Liberty", "Big Ben", "Great Wall of China", "Taj Mahal", "Parthenon", "Colosseum", "Sydney Opera House", "Machu Picchu", "Pyramid of Giza" ]
    const inventory = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    

    function addInInventory( souvenir_label: string, quantity:number)
    {
        let souvenir_id = inventory_labels.indexOf(souvenir_label)
        inventory[souvenir_id] += 1 * quantity
        console.log(inventory);
    }

    function removeInInventory( souvenir_label: string, quantity:number)
    {
        let souvenir_id = inventory_labels.indexOf(souvenir_label)
        inventory[souvenir_id] -= 1 * quantity
        console.log(inventory);
    }

    function howManyInInventory( souvenir_label: string)
    {
        let souvenir_id = inventory_labels.indexOf(souvenir_label)
        return inventory[souvenir_id]
    }

    function getLabels()
    {
        return inventory_labels
    }

    function getInventory()
    {
        return inventory
    }

    function eventGetSouvenir( probability:number, students:number){
        if (students >= 30) {
          // probability in %
          
          let rand = Math.random()*100
          if (rand < probability)
          {
              let numberOfElements = inventory_labels.length
              let souvenir_id = Math.floor(Math.random()*numberOfElements)
              console.log(souvenir_id);
              
              inventory[souvenir_id] += 1
              console.log("you won a souvenir", inventory_labels[souvenir_id]);
              console.log(inventory);
          }
        }
        else {
          console.log("not enough students");
        }
    }



    return { inventory_labels, inventory, addInInventory, removeInInventory, howManyInInventory, getLabels, getInventory, eventGetSouvenir}
  })

