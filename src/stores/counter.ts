import { ref } from 'vue'
import { defineStore } from 'pinia'

let timestamp: number =
  localStorage.getItem('timestamp') != null
    ? Number.parseInt(localStorage.getItem('timestamp'))
    : Date.now()

let deltaSecond: number = (Date.now() - timestamp) / 1000

const backupObjectRef = {
  student: '0',
  money: '0',
  mainCoef: '5',
  clickCoef: '1',
  moneyCoef: '1'
}

const inventoryRef = [
  {
    name: 'Statue of Liberty',
    drop_rate: 40,
    quantity: 0,
    picture: '/src/assets/StatueOfLiberty.webp'
  },
  {
    name: 'Big Ben',
    drop_rate: 17,
    quantity: 0,
    picture: '/src/assets/BigBen.webp'
  },
  {
    name: 'Eiffel Tower',
    drop_rate: 11,
    quantity: 0,
    picture: '/src/assets/eiffel_tower.webp'
  },
  {
    name: 'Winter Palace',
    drop_rate: 9,
    quantity: 0,
    picture: '/src/assets/WinterPalace.webp'
  },
  {
    name: 'Taj Mahal',
    drop_rate: 8,
    quantity: 0,
    picture: '/src/assets/TajMahel.webp'
  },
  {
    name: 'Parthenon',
    drop_rate: 5,
    quantity: 0,
    picture: '/src/assets/Parthenon.webp'
  },
  {
    name: 'Colosseum',
    drop_rate: 5,
    quantity: 0,
    picture: '/src/assets/Colosseum.webp'
  },
  {
    name: 'Sydney Opera House',
    drop_rate: 4,
    quantity: 0,
    picture: '/src/assets/SydneyOperaHouse.webp'
  },
  {
    name: 'Machu Picchu',
    drop_rate: 3,
    quantity: 0,
    picture: '/src/assets/MachuPicchu.webp'
  },
  {
    name: 'Pyramid of Giza',
    drop_rate: 2,
    quantity: 0,
    picture: '/src/assets/PyramidOfGiza.webp'
  },
  {
    name: 'Great Wall of China',
    drop_rate: 1,
    quantity: 0,
    picture: '/src/assets/GreatWallOfChina.webp'
  }
]

let backupStr = localStorage.getItem('mainStat')
if (backupStr == null) {
  backupStr = JSON.stringify(backupObjectRef)
  localStorage.setItem('mainStat', backupStr)
}

let inventoryBackupStr = localStorage.getItem('inventory')
if (inventoryBackupStr == null) {
  inventoryBackupStr = JSON.stringify(inventoryRef)
  localStorage.setItem('inventory', inventoryBackupStr)
}

export let backup = JSON.parse(backupStr)
export let inventory = JSON.parse(inventoryBackupStr)
const inventoryVueRef = ref(inventory)

if(localStorage.getItem('username'))
  backup.student = (Number.parseFloat(backup.student) + deltaSecond * (Number.parseFloat(backup.mainCoef) / 5)).toString()


export function setBackup(newBackup: object) {
  backup = newBackup
  saveData(backup)
}

export const useCounterStore = defineStore('counter', () => {
  const student = ref(Number.parseInt(backup.student))
  const mainCoef = ref(Number.parseInt(backup.mainCoef))
  const clickCoef = ref(Number.parseInt(backup.clickCoef))
  let clockId = null

  function startClock() {
    // add student in the time
    clockId = setInterval(() => {
      // 5000 -> calibrated value
      student.value += mainCoef.value / 50
      backup.student = student.value
      saveData(backup)

      timestamp = Date.now()
      localStorage.setItem('timestamp', timestamp.toString())
    }, 100)
  }

  function stopClock() {
    if (clockId != null) clearInterval(clockId)
  }

  function mainClick() {
    student.value += mainCoef.value / 5
    backup.student = student.value
    saveData(backup)
  }

  function reset() {
    stopClock()
    let name = localStorage.getItem('username')
    let username = name.substring(0, name?.length - 5)
    let tagarr = name.split('#')
    let tag = tagarr[tagarr.length - 1]

    fetch('http://10.57.33.202:48756/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, tag: tag })
    })
      .then((result) => result.json())
      .then((json) => (username = `${username}#${json.tag}`))
      .catch((err) => console.error(err))

    localStorage.clear()
    student.value = Number.parseInt(backupObjectRef.student)
    mainCoef.value = Number.parseInt(backupObjectRef.mainCoef)
    clickCoef.value = Number.parseInt(backupObjectRef.clickCoef)

    backup.student = student.value.toString()
    backup.mainCoef = mainCoef.value.toString()
    backup.clickCoef = clickCoef.value.toString()
    backup.money = '0'
    useCounterMoney().money = 0
    backup.moneyCoef = '1'

    saveData(backup)
    location.reload()
  }

  return { student, mainCoef, startClock, stopClock, clickCoef, mainClick, reset }
})

export const useCounterMoney = defineStore('counterMoney', () => {
  const money = ref(Number.parseInt(backup.money))
  const moneyCoef = ref(Number.parseFloat(backup.moneyCoef))

  function mainClick(students: number) {
    money.value += students * moneyCoef.value
    backup.money = money.value
    backup.student = 0
    saveData(backup)
  }

  function addmoney(quantity: number) {
    money.value += quantity
    backup.money = money.value
    saveData(backup)
  }

  return { money, moneyCoef, mainClick, addmoney }
})

export const useCounterInventory = defineStore('counterInventory', () => {
  function addInInventory(souvenir_label: string, student: number) {
    const element = inventoryVueRef.value.find(
      (value: { name: string }) => value.name == souvenir_label
    )
    if (element != undefined) {
      element.quantity += 1 * student
    }
    saveInventory()
  }

  function removeInInventory(souvenir_label: string, student: number) {
    const element = inventoryVueRef.value.find(
      (value: { name: string }) => value.name == souvenir_label
    )
    if (element != undefined) {
      element.quantity -= 1 * student
    }
    saveInventory()
  }

  function howManyInInventory(souvenir_label: string) {
    const element = inventoryVueRef.value.find(
      (value: { name: string }) => value.name == souvenir_label
    )
    if (element != undefined) {
      return element.quantity
    }
    return 0
  }

  function getLabels() {
    const inventory_labels = []
    for (let i = 0; i < inventoryVueRef.value.length; i++) {
      inventory_labels.push(inventoryVueRef.value[i].name)
    }
    return inventory_labels
  }

  function getInventory() {
    return inventoryVueRef
  }

  function eventGetSouvenir(probability: number, students: number, groups_width: number) {
    if (students >= 30) {
      // we will repeat the action for each group of 50 students
      const groups = Math.floor(students / groups_width)
      for (let i = 0; i < groups; i++) {
        // probability in %
        const rand = Math.random() * 100 //  value will be between 0 and 100

        if (rand >= probability) {
          // get souvenir id random  respectively to his drop chance
          const random_number = Math.floor(Math.random() * 100)
          let souvenir_id = 0
          let sum = 0
          for (let i = 0; i < inventoryVueRef.value.length; i++) {
            sum += inventoryVueRef.value[i].drop_rate
            if (random_number < sum) {
              souvenir_id = i
              break
            }
          }
          addInInventory(inventoryVueRef.value[souvenir_id].name, 1)

          const documentAlertElement = document.getElementById('alert')
          if (documentAlertElement != null) {
            documentAlertElement.style.display = 'block'
          }
          const documentPopupElement = document.getElementById('popup-souvenir')
          if (documentPopupElement != null) {
            documentPopupElement.innerHTML = 'You won a new souvenir'
          }

          setInterval(() => {
            if (documentAlertElement != null) {
              documentAlertElement.style.display = 'none'
            }
          }, 3000)
        }
      }
    } else {
      console.log('not enough students')
    }
  }

  return {
    inventoryVueRef,
    addInInventory,
    removeInInventory,
    howManyInInventory,
    getLabels,
    getInventory,
    eventGetSouvenir
  }
})

export const useCounterSuccess = defineStore('counterSuccess', () => {
  const Store = useCounterStore()
  let students = Store.student

  const Money = useCounterMoney()
  let money = Money.money

  const Inventory = useCounterInventory()
  let inventory_now = Inventory.getInventory()
  
  const success_list = ref([
      {
        name: 'Good move',
        description: 'play to the game',
        type: 'troll',
        quantity: 0,
        reward: 0,
        status: true,
        date: new Date().toLocaleString(),
        image: '/src/assets/PlayToTheGame.webp'
      },
      {
        name: 'Claude Money $$$',
        description: 'have 1 000$',
        type: 'money',
        quantity: 1000,
        reward: 10,
        status: false,
        date: null,
        image: '/src/assets/ClaudeMoney.webp'
      },
      {
        name: 'Lionel RICH-ie',
        description: 'have 1 000 000$',
        type: 'money',
        quantity: 1000000,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/Lionel.webp'
      },
      {
        name: "I'm Clint rich wood",
        description: 'have 1 000 000 000$',
        type: 'money',
        quantity: 1000000000,
        reward: 10000,
        status: false,
        date: null,
        image: '/src/assets/ClinRichWood.webp'
      },
      {
        name: 'Jeff Pessos',
        description: 'Have 100 000 000 000$',
        type: 'money',
        quantity: 100000000000,
        reward: 100000,
        status: false,
        date: null,
        image: '/src/assets/JeffPessos.png'
      },
      {
        name: 'Earth Owner',
        description: 'Have 1 000 000 000 000$',
        type: 'money',
        quantity: 1000000000000,
        reward: 1000000,
        status: false,
        date: null,
        image: '/src/assets/EarthOwner.png'
      },
      {
        name: 'First step',
        description: 'Have 1 Statue of Liberty',
        type: 'inventory',
        object: 'Statue of Liberty',
        quantity: 1,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/Step.png'
      },
      {
        name: 'Democracy',
        description: 'Have 1000 Statue of Liberty',
        type: 'inventory',
        object: 'Statue of Liberty',
        quantity: 1000,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/Democracy.png'
      },
      {
        name: 'Freedom',
        description: 'Have 100 Statue of Liberty',
        type: 'inventory',
        object: 'Statue of Liberty',
        quantity: 100,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/Freedom.png'
      },
      {
        name: 'Ding - Dong',
        description: 'Have 100 Big Ben',
        type: 'inventory',
        object: 'Big Ben',
        quantity: 100,
        reward: false,
        date: null,
        image: '/src/assets/DingDong.png'
      },
      {
        name: 'French Baguette',
        description: 'Have 100 Eiffel Tower',
        type: 'inventory',
        object: 'Eiffel Tower',
        quantity: 100,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/FrenchBaguette.png'
      },
      {
        name: 'winter is coming',
        description: 'Have 50 Winter Palace',
        type: 'inventory',
        object: 'Winter Palace',
        quantity: 50,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/WinterIsComing.webp'
      },
      {
        name: 'Wall-HE !!',
        description: 'Have 1 Great Wall of China',
        type: 'inventory',
        object: 'Great Wall of China',
        quantity: 1,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/WLL-E.webp'
      },
      {
        name: 'God of War',
        description: 'Have 1 Colosseum',
        type: 'inventory',
        object: 'Colosseum',
        quantity: 1,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/GodOfWar.png'
      },
      {
        name: 'Opera Singer',
        description: 'Have 1 Sydney Opera House',
        type: 'inventory',
        object: 'Sydney Opera House',
        quantity: 1,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/OperaSinger.webp'
      },
      {
        name: 'Pyramid Of cheddar',
        description: 'Have 10 Pyramid of Giza',
        type: 'inventory',
        object: 'Pyramid of Giza',
        quantity: 10,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/PyramideOfCheddar.webp'
      },
      {
        name: 'The 7 wonders of the world',
        description: 'Have 1 of each souvenirs',
        type: 'all',
        quantity: 1,
        reward: 100000,
        status: false,
        date: null,
        image: '/src/assets/WondersOfTheWorld.png'
      },
      {
        name: 'Wonder-full World',
        description: 'Have 10 of each souvenirs',
        type: 'all',
        quantity: 10,
        reward: 1000000,
        status: false,
        date: null,
        image: '/src/assets/WonderFull.png'
      },
      {
        name: 'tutor',
        description: 'Have 10 students',
        type: 'students',
        quantity: 10,
        reward: 10,
        status: false,
        date: null,
        image: '/src/assets/Tutor.png'
      },
      {
        name: 'teacher',
        description: 'Have 100 students',
        type: 'students',
        quantity: 100,
        reward: 100,
        status: false,
        date: null,
        image: '/src/assets/Teacher.png'
      },
      {
        name: 'influencer',
        description: 'Have 1000 students',
        type: 'students',
        quantity: 1000,
        reward: 1000,
        status: false,
        date: null,
        image: '/src/assets/influencer.webp'
      },
      {
        name: 'youtuber',
        description: 'Have 10000 students',
        type: 'students',
        quantity: 10000,
        reward: 2000,
        status: false,
        date: null,
        image: '/src/assets/youtube.png'
      },
      {
        name: 'Streamer',
        description: 'Have 100000 students',
        type: 'students',
        quantity: 100000,
        reward: 5000,
        status: false,
        date: null,
        image: '/src/assets/Streamer.webp'
      },
      {
        name: 'EL PROFESSOR',
        description: 'Have 1 000 000 000 students',
        type: 'students',
        quantity: 1000000000,
        reward: 100000,
        status: false,
        date: null,
        image: '/src/assets/ELPROFESSOR.png'
      }
    ])

    /* if(localStorage.getItem('success')) {
      success_list.value = JSON.parse(localStorage.getItem('success'))
    }
    else
      localStorage.setItem('success', ) */

  function checkSuccessesStudents(studentsQuantity: number) {
    // for each success
    for (let i = 0; i < success_list.value.length; i++) {
      // if the success is not already won
      const success = success_list.value[i]
      if (success.status == false) {
        if (success.type == 'students') {
          if (studentsQuantity >= success.quantity) {
            // get date in format DD:MM:YY:HH:MM:SS
            success.date = new Date().toLocaleString()
            success.status = true
            alert('You won a success : ' + success.name)
          }
        }
      }
    }
    localStorage.setItem('success', JSON.stringify(success_list.value))
  }

  function checkSuccessesMoneyInventory(moneyQuantity: number, inventory: any) {
    // for each success
    for (let i = 0; i < success_list.value.length; i++) {
      // if the success is not already won
      const success = success_list.value[i]
      if (success.status == false) {
        if (success.type == 'money') {
          if (moneyQuantity >= success.quantity) {
            // get date in format DD:MM:YY:HH:MM:SS
            success.date = new Date().toLocaleString()
            success.status = true
            alert('You won a success : ' + success.name)
          }
        } else if (success.type == 'all') {
          let successAll = true

          inventory.forEach((element: any) => {
            if (element.quantity < success.quantity) {
              successAll = false
            }
          })
          if (successAll) {
            // get date in format DD:MM:YY:HH:MM:SS
            success.date = new Date().toLocaleString()
            success.status = true
            alert('You won a success : ' + success.name)
          }
        } else if (success.type == 'troll') {
          // get date in format DD:MM:YY:HH:MM:SS
          success.date = new Date().toLocaleString()
          success.status = true
        } else if (success.type == 'inventory') {
          inventory.forEach((element: any) => {
            if (element.name == success.object) {
              if (element.quantity >= success.quantity) {
                // get date in format DD:MM:YY:HH:MM:SS
                success.date = new Date().toLocaleString()
                success.status = true
                alert('You won a success : ' + success.name)
              }
            }
          })
        }
      }
    }
  }
  setInterval(() => {
    students = Store.student
    money = Money.money
    inventory_now = Inventory.inventoryVueRef
    checkSuccessesMoneyInventory(money, [...inventory_now])
    checkSuccessesStudents(students)
  }, 1000)

  function getSuccessList() {
    return success_list
  }

  return { success_list, getSuccessList, checkSuccessesMoneyInventory, checkSuccessesStudents }
})

function saveData(backup: object) {
  localStorage.setItem('mainStat', JSON.stringify(backup))
}

function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventoryVueRef.value))
}
