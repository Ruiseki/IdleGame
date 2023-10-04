import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  const point = ref(0)
  const mainCoef = ref(1)
  const clickCoef = ref(1)

  setInterval(() => {
    point.value += 1 * mainCoef.value
  }, 5000)

  function mainClick()
  {
      point.value += 1 * clickCoef.value
      console.log(point);
  }

  return { point, mainCoef, clickCoef, mainClick }
})
