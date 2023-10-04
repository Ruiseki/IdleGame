<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from "@/stores/counter"
import { reactive, ref, toRefs } from 'vue'

let studentNumber : number = useCounterStore()

</script>

<template>
    <header id="header">
        <div id="stats">
            <p>{{ studentNumber.point }} Students 🧑‍🎓</p>
            <p>Money 💰</p>
        </div>
        <nav id="navigation">
            <RouterLink to="/">Upgrade</RouterLink>
            <RouterLink to="/inventory">Inventory</RouterLink>
            <RouterLink to="/shop">Shop</RouterLink>
        </nav>
    </header>
    <div id="home">
        <section id="clicker">
            <img src="/" alt="Image totally legal took from the discord channel Warning zone "/>
            <button @click="studentNumber.mainClick()">Spam me for student</button><!-- ajouter la fonction qui ajoute 1 etudiant au nombre d'etudiant -->
            <button>Take students on a trip 🧑‍🎓</button><!-- ajouter la fonction qui depense les etudiants pour donner de l'argent -->
        </section>
        <RouterView />
    </div>
    
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

    #home {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 90vh;
    }

    #clicker {
        width: 60vw;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
    }

    #clicker button {
        width: 40%;
        margin-left: 30%;
        padding: 1rem;
        margin-bottom: 30px;
    }
</style>
