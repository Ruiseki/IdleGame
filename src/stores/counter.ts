import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
  
    setInterval(()=>{
      count.value++
    }, 5000)

    return {
      count
    }

})

