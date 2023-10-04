<script setup lang="ts">

</script>

<template>
    <div id="home">
        <section id="clicker">
            <img src="/" alt="Image totally legal took from the discord channel Warning zone "/>
            <button>Spam me for student</button><!-- ajouter la fonction qui ajoute 1 etudiant au nombre d'etudiant -->
            <button>Take students on a trip 🧑‍🎓</button><!-- ajouter la fonction qui depense les etudiants pour donner de l'argent -->
        </section>
        <section id="upgrades">
            <div class="upgrade"><!-- ajouter le v-for pour boucler sur les differentes upgrades  -->
                <p>Name</p>
                <p>Level</p>
                <p>Price 💰</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
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