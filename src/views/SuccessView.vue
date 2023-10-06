<script setup lang="ts">
import { useCounterSuccess } from '@/stores/counter'

let success = useCounterSuccess()
let table_successes = success.getSuccessList()
</script>

<template>
  <section id="items">
    <div class="item">
      <div>
        <p>Success</p>
      </div>
      <div>
        <p>description</p>
      </div>
      <div>
        <p>Date</p>
      </div>
      <div>
        <p>🏆</p>
      </div>
    </div>
    <div v-for="(success, k) in table_successes" :key="k">
      <div class="item" v-if="table_successes[k].status == true">
        <div>
          <!-- image -->
          <img
            style="width: 100px; border-radius: 70px"
            :src="table_successes[k].image"
            :alt="[...table_successes][k].name"
          />
        </div>

        <div>
          <p>{{ table_successes[k].name }}</p>
        </div>

        <div>
          <p>{{ table_successes[k].description }}</p>
        </div>

        <div>
          <p>{{ table_successes[k].date }}</p>
        </div>

        <div>
          <!-- Validate check-->
          <p>✅</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#items {
  width: 38vw;
  padding: 2rem;
  overflow: scroll;
}

.item {
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
}

.item div {
  width: 33%;
  text-align: right;
}
</style>
