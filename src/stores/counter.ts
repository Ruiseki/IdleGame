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
