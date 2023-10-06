import { ref } from 'vue'
import { defineStore } from 'pinia'

// TO DO : timestamp

const backupObjectRef = {
    student: '0',
    money: '0',
    mainCoef: '5',
    clickCoef: '1',
    moneyCoef: '1'
  }

const inventoryRef = [
  {
    "name": "Statue of Liberty",
    "drop_rate": 30,
    "quantity": 0,
    "picture": "/src/assets/StatueOfLiberty.webp",
  },
  {
    "name": "Big Ben",
    "drop_rate": 20,
    "quantity": 0,
    "picture": "/src/assets/BigBen.webp",
  },
  {
    "name": "Eiffel Tower",
    "drop_rate": 12,
    "quantity": 0,
    "picture": "/src/assets/eiffel_tower.webp",
  },
  {
    "name": "Winter Palace",
    "drop_rate": 10,
    "quantity": 0,
    "picture": "/src/assets/WinterPalace.webp",
  },
  {
    "name": "Taj Mahal",
    "drop_rate": 8,
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
    "picture": "/src/assets/Colosseum.webp",
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
    "name": "Great Wall of China",
    "drop_rate": 1,
    "quantity": 0,
    "picture": "/src/assets/GreatWallOfChina.webp",
  }
]

let backupStr = localStorage.getItem('mainStat')
if (backupStr == null)
{
  backupStr = JSON.stringify(backupObjectRef)
  localStorage.setItem('mainStat', backupStr)
}

export let backup = JSON.parse(backupStr)

export function setBackup(newBackup: object)
{
  backup = newBackup
  saveData(backup)
}

export const useCounterStore = defineStore('counter', () => {

  const student = ref(Number.parseInt(backup.student))
  const mainCoef = ref(Number.parseInt(backup.mainCoef))
  const clickCoef = ref(Number.parseInt(backup.clickCoef))

  // add student in the time
  setInterval(() => { 
    // 5000 -> calibrated value
    student.value += mainCoef.value / 50;
    backup.student = student.value;
    saveData(backup);
  }, 100)

  function mainClick()
  {
      student.value += 1 * clickCoef.value
      backup.student = student.value
      saveData(backup)
  }

  function reset()
  {
    localStorage.clear()
    student.value = Number.parseInt(backupObjectRef.student)
    mainCoef.value = Number.parseInt(backupObjectRef.mainCoef)
    clickCoef.value = Number.parseInt(backupObjectRef.clickCoef)

    backup.student = student.value.toString()
    backup.mainCoef = mainCoef.value.toString()
    backup.clickCoef = clickCoef.value.toString()
    backup.money = '0'
    backup.moneyCoef = '1'
    saveData(backup)
  }

  return { student, mainCoef, clickCoef, mainClick, reset }
})

export const useCounterMoney = defineStore('counterMoney', () => {

    const money = ref(Number.parseInt(backup.money))
    const moneyCoef = ref(Number.parseInt(backup.moneyCoef))

    function mainClick( students: number)
    {
        money.value += students * moneyCoef.value
        backup.money = money.value
        backup.student = 0
        saveData(backup)
    }

    function addmoney( quantity:number){
      money.value += quantity
      backup.money = money.value
      saveData(backup)
    }
  
    return { money, moneyCoef, mainClick, addmoney }
  })


export const useCounterInventory = defineStore('counterInventory', () => {

    const inventory = ref([
      {
        "name": "Statue of Liberty",
        "drop_rate": 30,
        "quantity": 0,
      },
      {
        "name": "Big Ben",
        "drop_rate": 20,
        "quantity": 0,
      },
      {
        "name": "Eiffel Tower",
        "drop_rate": 12,
        "quantity": 0,
      },
      {
        "name": "Winter Palace",
        "drop_rate": 10,
        "quantity": 0,
      },
      {
        "name": "Taj Mahal",
        "drop_rate": 8,
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
        "name": "Great Wall of China",
        "drop_rate": 1,
        "quantity": 0,
      }
    ])

      

    function addInInventory( souvenir_label: string, student:number)
    {
      const element = inventory.value.find(value => value.name == souvenir_label)
      if (element != undefined){
       element.quantity += 1 * student
      }
    }

    function removeInInventory( souvenir_label: string, student:number)
    {
      const element = inventory.value.find(value => value.name == souvenir_label)
      if (element != undefined){
        element.quantity -= 1 * student
      }
    }

    function howManyInInventory( souvenir_label: string)
    {
      const element = inventory.value.find(value => value.name == souvenir_label)
      if (element != undefined){
        return element.quantity
      }
      return 0
    }

    function getLabels()
    {
      const inventory_labels = []
      for (let i = 0; i < inventory.value.length; i++) {
        inventory_labels.push(inventory.value[i].name)
      }
      return inventory_labels
    }

    function getInventory()
    {
        return inventory
    }

    function eventGetSouvenir( probability:number, students:number, groups_width:number){
        if (students >= 30) {
          // we will repeat the action for each group of 50 students
          const groups = Math.floor(students/groups_width)
          for (let i = 0; i < groups; i++) {

            // probability in %
            const rand = Math.random()*100 //  value will be between 0 and 100
            if (rand >= probability)
            {
                // get souvenir id random  respectively to his drop chance
                const random_number = Math.floor(Math.random()*100)
                let souvenir_id = 0
                let sum = 0
                for (let i = 0; i < inventory.value.length; i++) {
                  sum += inventory.value[i].drop_rate
                  if (random_number < sum)
                  {
                    souvenir_id = i
                    break
                  }
                }
                addInInventory(inventory.value[souvenir_id].name, 1) 

                const documentAlertElement = document.getElementById('alert')
                if (documentAlertElement != null){
                  documentAlertElement.style.display = "block"
                }
                const documentPopupElement = document.getElementById('popup-souvenir')
                if (documentPopupElement != null){
                  documentPopupElement.innerHTML = "You won a new souvenir"
                }
                
                setInterval(() => {
                  if (documentAlertElement != null){
                    documentAlertElement.style.display = "none"
                  }
                }, 3000)
                
            }
          }
        }
        else {
          console.log("not enough students");
        }
    }

    return {inventory, addInInventory, removeInInventory, howManyInInventory, getLabels, getInventory, eventGetSouvenir}
  })

export const useCounterSuccess = defineStore('counterSuccess', () => {
  const success_list = ref([
    {
      name: "Good move",
      description: "play to the game",
      type: "troll",
      quantity: 0,
      reward: 0,
      status: true
    },
    {
      name: "I'm Clint rich wood",
      description: "have 1 000 000 000$",
      type: "money",
      quantity: 1000000000,
      reward: 0,
      status: false
    },
    {
      name: "First step",
      description: "Have 1 Statue of Liberty",
      type: "Statue of Liberty",
      quantity: 1,
      reward: 100,
      status: false
    },
    {
      name: "Freedom",
      description: "Have 100 Statue of Liberty",
      type: "Statue of Liberty",
      quantity: 100,
      reward: 1000,  
      status: false
    },
    {
      name: "Ding - Dong",
      description: "Have 100 Big Ben",
      type: "Big Ben",
      quantity: 100,
      reward: false
    },
    {
      name: "French Baguette",
      description: "Have 100 Eiffel Tower",
      type: "Eiffel Tower",
      quantity: 100,
      reward: 1000,
      status: false
    },
    {
      name: "winter is coming",
      description: "Have 50 Winter Palace",
      type: "Winter Palace",
      quantity: 50,
      reward: 1000,
      status: false
    },
    {
      name: "Wall-E",
      description: "Have 1 Great Wall of China",
      type: "Great Wall of China",
      quantity: 1,
      reward: 100,
      status: false
    },
    {
      name: "God of War",
      description: "Have 1 Colosseum",
      type: "Colosseum",
      quantity: 1,
      reward: 100,
      status: false
    },
    {
      name: "Pyramid Of cheddar",
      description: "Have 10 Pyramid of Giza",
      type: "Pyramid of Giza",
      quantity: 10,
      reward: 1000,
      status: false
    },
    {
      name: "The 7 wonders of the world",
      description: "Have 1 of each souvenirs",
      type: "all",
      quantity: 1,
      reward: 100000,
      status: false
    },
    {
      name: "influencer",
      description: "Have 1000 students",
      type: "students",
      quantity: 1000,
      reward: 1000,
      status: false
    },
    {
      name: "youtuber",
      description: "Have 10000 students",
      type: "students",
      quantity: 10000,
      reward: 2000,
      status: false
    },
    {
      name: "twitcher",
      description: "Have 100000 students",
      type: "students",
      quantity: 100000,
      reward: 5000,
    },
    {
      name: "EL PROFESSOR",
      description: "Have 1 000 000 000 students",
      type: "students",
      quantity: 1000000000,
      reward: 100000,
      status: false
    }
  ])

  function checkSuccesses(moneyQuantity:number, inventory:any, students:number)
  {
    // for each success
    for (let i = 0; i < success_list.value.length; i++) {
      // if the success is not already won
      const success = success_list.value[i]
      if (success.status == false)
      {
        if (success.type == "money")
        {
          if (moneyQuantity >= success.quantity)
          {
            success.status = true
            alert("You won a success : " + success.name)
          }
        }
        else if (success.type == "all")
        {
          let successAll = true
          for (let j = 0; j < inventory.length; j++) {
            if (inventory.quantity[j] == 0)
            {
              successAll = false
              break
            }
          }
          if (successAll)
          {
            success.status = true
            alert("You won a success : " + success.name)
          }
        }
        else if (success.type == "students"){
          if (students >= success.quantity)
          {
            success.status = true
            alert("You won a success : " + success.name)
          }
        }
      }
    }
  }
  setInterval(() => { checkSuccesses(backup.money, backup.inventory, backup.student) }, 1000)

  function getSuccessList()
  {
    return success_list
  }

  return {success_list, getSuccessList, checkSuccesses}
})


function saveData(backup: object)
{
  localStorage.setItem('mainStat', JSON.stringify(backup))
}