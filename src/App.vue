<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header id="header">
        <div id="stats">
            <p>Students 🧑‍🎓</p>
            <p>Money 💰</p>
        </div>
        <nav id="navigation">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/inventory">Inventory</RouterLink>
            <RouterLink to="/shop">Shop</RouterLink>
        </nav>
    </header>
    <RouterView />
</template>

<style scoped>  
    #header {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    #stats {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 60%;
        padding: 2rem;
    }

    #navigation {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 40%;
        height: 10vh;
        padding: 2rem;
    }

    template{
        height: 100vh;
    }
</style>
