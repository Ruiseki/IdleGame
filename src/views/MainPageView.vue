<script setup lang="ts">
    import { useUpgrade } from '@/stores/upgrade'

    const upgradeList = useUpgrade();

</script>

<template>
    <section id="upgrades">
        <button class="upgrade" @click="upgradeList.levelUp(upgrade.name)" v-for="(upgrade, i) in upgradeList.upgradeList" :key="i">
            <div>
                <p>{{ upgrade.name }}</p>
            </div>
            <div>
                <p>Student coef: {{ `${Number.parseInt(upgrade.coefBonus)/5}` }}</p>
                <p>Money coef: {{ upgrade.moneyCoefBonus }}</p>
                <p>Drop coef: {{ upgrade.coefDropRate }}</p>
            </div>
            <div>
                <p>{{ upgrade.level }}</p>
            </div>
            <div>
                <p>{{ `${Number.parseInt(upgrade.cost)}` }} 💰</p>
            </div>
        </button>
    </section>
</template>

<style scoped>
    #upgrades {
        width: 40vw;
        padding: 2rem;
    }

    .upgrade {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        border-radius: 50px;
    }

    .upgrade:hover {
        background-color: rgb(255, 0, 208);
    }

    .upgrade:active {
        background-color: aqua;
    }

    .upgrade div {
        width: 25%;
        text-align: center;
    }
</style>