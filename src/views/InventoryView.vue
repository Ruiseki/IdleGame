<script setup lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore, useCounterInventory } from '@/stores/counter'

const studentNumber = useCounterStore()
const counterInventory = useCounterInventory()

let table_labels = counterInventory.getLabels()
let table_quantities = counterInventory.getInventory()
let table_inventory = counterInventory.getInventory()

var estimated_price: any[] = []
for (let i = 0; i < table_labels.length; i++) {
  estimated_price.push(Math.floor(Math.random() * 100))
}
</script>

<template>
  <section id="items">
    <div class="item">
      <p>
        Per pack of {{ `${60 + Math.floor((studentNumber.mainCoef * 2) / 5)}` }} students, you have
        a chance (1/100) to get a souvenir
      </p>
    </div>
    <div class="item">
      <div>
        <p>Name</p>
      </div>
      <div>
        <p>Quantity</p>
      </div>
      <div>
        <p><i>Estimated price 💰 :</i></p>
      </div>
    </div>
    <div class="item" v-for="(items, k) in table_labels" :key="k">
      <div>
        <!--i want a picture with the url value equals to [...table_inventory][k].picture wich is an url of the picture -->
        <img
          style="width: 140px; border-radius: 60px"
          :src="table_inventory[k].picture"
          :alt="[...table_inventory][k].picture"
        />
      </div>
      <div>
        <p>{{ table_labels[k] }}</p>
      </div>
      <div>
        <p>
          <b>{{ table_quantities[k].quantity }}</b>
        </p>
      </div>
      <div>
        <p>{{ estimated_price[k] }}</p>
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
