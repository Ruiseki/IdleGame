<script setup lang="ts">

</script>

<template>
    <section id="upgrades">
        <div class="upgrade"><!-- ajouter le v-for pour boucler sur les differentes upgrades  -->
            <p>Name</p>
            <p>Level</p>
            <p>Price 💰</p>
        </div>
    </section>
</template>

<style scoped>
    #upgrades {
        width: 40vw;
        padding: 2rem;
    }

    .upgrade {
        border: 1px solid black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
    }
</style>