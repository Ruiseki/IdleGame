import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  const quantity = ref(0)
  const mainCoef = ref(1)
  const clickCoef = ref(1)

  setInterval(() => {
    quantity.value += 1 * mainCoef.value
  }, 5000)

  function mainClick()
  {
      quantity.value += 1 * clickCoef.value
      console.log(quantity);
  }

  return { quantity, mainCoef, clickCoef, mainClick }
})

export const useCounterMoney = defineStore('counterMoney', () => {
  
    const money = ref(0)
    const mainCoef = ref(1)
    
    function mainClick( students: number)
    {
        money.value += students * mainCoef.value
        console.log(money);
    }
  
    return { money, mainCoef, mainClick }
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

