<script setup lang="ts">
import { defineComponent } from 'vue'
import { useCounterSuccess } from '@/stores/counter';

var table_successes = useCounterSuccess().getSuccessList()

</script>

<template>
    <section id="items">
        <div class="item"><!-- ajouter le v-for pour boucler sur les differentes items  -->
            <div>
                <p>Success</p>
            </div>
            <div>
                <p>description</p>
            </div>
            <div>
                <p>Status</p>
            </div>
            <div>
                    <p> 🏆 </p>
            </div>
        </div>
        <div v-for="(success, k) in table_successes" :key="k">
        <div class="item" v-if="table_successes[k].status == true">

            <div>
                <p>{{ table_successes[k].name }}</p>
            </div>

            <div>
                <p>{{ table_successes[k].description}}</p>
            </div>

            <div>
                <p>{{ table_successes[k].status }}</p>
            </div>

            <div> <!-- Validate check-->
                <p>✅</p>
            </div>

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