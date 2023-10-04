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
    const clickCoef = ref(1)
  
    setInterval(() => {
      money.value += 1 * mainCoef.value
    }, 5000)
  
    function mainClick()
    {
        money.value += 1 * clickCoef.value
        console.log(money);
    }
  
    return { money, mainCoef, clickCoef, mainClick }
  }
