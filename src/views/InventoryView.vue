<script setup lang="ts">
import { defineComponent } from 'vue'
import { useCounterInventory } from '@/stores/counter';

const counterInventory = useCounterInventory()

let table_labels = counterInventory.getLabels()
let table_quantities = counterInventory.getInventory()


var estimated_price: any[] = []
for (let i = 0; i < table_labels.length; i++) {
    estimated_price.push(Math.floor(Math.random() * 100))
}
</script>

<template>
    <section id="items">
        <div class="item"><!-- ajouter le v-for pour boucler sur les differentes items  -->
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
                <p>{{ table_labels[k] }}</p>
            </div>
            <div>
                <p>{{ table_quantities[k]}}</p>
            </div>
            <div>
                <p>{{ estimated_price[k] }}</p>
            </div> 
        </div>
    </section>
</template>

<style scoped>
    #items {
        width: 40vw;
        padding: 2rem;
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