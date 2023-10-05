import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// TO DO : timestamp

let backupStr = localStorage.getItem('lastsave')
if (backupStr == null)
{
  backupStr = JSON.stringify({
    student: '0',
    money: '0',
    mainCoef: '1',
    clickCoef: '1',
    moneyCoef: '1'
  })
  localStorage.setItem('lastsave', backupStr)
}

let backup = JSON.parse(backupStr)

export const useCounterStore = defineStore('counter', () => {

  const student = ref(Number.parseInt(backup.student))
  const mainCoef = ref(Number.parseInt(backup.mainCoef))
  const clickCoef = ref(Number.parseInt(backup.clickCoef))

  // add student in the time
  setInterval(() => {
    student.value += 1 * mainCoef.value;
    backup.student = student.value;
    saveData(backup);
  }, 5000)

  function mainClick()
  {
      student.value += 1 * clickCoef.value
      backup.student = student.value
      saveData(backup)
  }

  return { student, mainCoef, clickCoef, mainClick }
})

export const useCounterMoney = defineStore('counterMoney', () => {

    const money = ref(Number.parseInt(backup.money))
    const moneyCoef = ref(Number.parseInt(backup.moneyCoef))
    
    function mainClick( students: number)
    {
        money.value += students * moneyCoef.value
        backup.money = money.value
        saveData(backup)
    }
  
    return { money, moneyCoef, mainClick }
  })


export const useCounterInventory = defineStore('counterInventory', () => {

    const inventory_labels = [ "Eiffel Tower", "Statue of Liberty", "Big Ben", "Great Wall of China", "Taj Mahal", "Parthenon", "Colosseum", "Sydney Opera House", "Machu Picchu", "Pyramid of Giza" ]
    const inventory = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    

    function addInInventory( souvenir_label: string, student:number)
    {
        let souvenir_id = inventory_labels.indexOf(souvenir_label)
        inventory[souvenir_id] += 1 * student
        console.log(inventory);
    }

    function removeInInventory( souvenir_label: string, student:number)
    {
        let souvenir_id = inventory_labels.indexOf(souvenir_label)
        inventory[souvenir_id] -= 1 * student
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

function saveData(backup: object)
{
  localStorage.setItem('lastsave', JSON.stringify(backup))
}