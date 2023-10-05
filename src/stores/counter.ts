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

    const inventory = [
      {
        "name": "Eiffel Tower",
        "drop_rate": 30,
        "quantity": 0,
      },
      {
        "name": "Statue of Liberty",
        "drop_rate": 20,
        "quantity": 0,
      },
      {
        "name": "Big Ben",
        "drop_rate": 10,
        "quantity": 0,
      },
      {
        "name": "Great Wall of China",
        "drop_rate": 10,
        "quantity": 0,
      },
      {
        "name": "Taj Mahal",
        "drop_rate": 10,
        "quantity": 0,
      },
      {
        "name": "Parthenon",
        "drop_rate": 5,
        "quantity": 0,
      },
      {
        "name": "Colosseum",
        "drop_rate": 5,
        "quantity": 0,
      },
      {
        "name": "Sydney Opera House",
        "drop_rate": 4,
        "quantity": 0,
      },
      {
        "name": "Machu Picchu",
        "drop_rate": 3,
        "quantity": 0,
      },
      {
        "name": "Pyramid of Giza",
        "drop_rate": 2,
        "quantity": 0,
      },
      {
        "name": "Winter Palace",
        "drop_rate": 1,
        "quantity": 0,
      }
    ]

      

    function addInInventory( souvenir_label: string, student:number)
    {
      let element = inventory.find(value => value.name == souvenir_label)
      if (element != undefined){
       element.quantity += 1 * student
      }
    }

    function removeInInventory( souvenir_label: string, student:number)
    {
      let element = inventory.find(value => value.name == souvenir_label)
      if (element != undefined){
        element.quantity -= 1 * student
      }
    }

    function howManyInInventory( souvenir_label: string)
    {
      let element = inventory.find(value => value.name == souvenir_label)
      if (element != undefined){
        return element.quantity
      }
      return 0
    }

    function getLabels()
    {
      let inventory_labels = []
      for (let i = 0; i < inventory.length; i++) {
        inventory_labels.push(inventory[i].name)
      }
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
              // get souvenir id random  respectively to his drop chance
              let random_number = Math.floor(Math.random()*100)
              let souvenir_id = 0
              let sum = 0
              for (let i = 0; i < inventory.length; i++) {
                sum += inventory[i].drop_rate
                if (random_number < sum)
                {
                  souvenir_id = i
                  break
                }
              }
              addInInventory(inventory[souvenir_id].name, 1)
              console.log("you won a souvenir", inventory[souvenir_id]);
              console.log(inventory);
          }
        }
        else {
          console.log("not enough students");
        }
    }



    return {inventory, addInInventory, removeInInventory, howManyInInventory, getLabels, getInventory, eventGetSouvenir}
  })

function saveData(backup: object)
{
  localStorage.setItem('lastsave', JSON.stringify(backup))
}