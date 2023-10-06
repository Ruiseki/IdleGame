<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {
  useCounterStore,
  useCounterMoney,
  useCounterInventory,
  useCounterSuccess
} from '@/stores/counter'
import { ref } from 'vue'

let success = useCounterSuccess()
let studentNumber = useCounterStore()
let money = useCounterMoney()
let inventory = useCounterInventory()
let username = ref('')

let storedUsername = localStorage.getItem('username')

if (storedUsername != null) studentNumber.startClock()

async function createAccount() {
  let login = document.getElementById('login-anticlick')

  await fetch('http://10.57.33.202:48756/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value })
  })
    .then((result) => result.json())
    .then((json) => {
      username.value = `${username.value}#${json.tag}`
      localStorage.setItem('username', username.value)
      location.reload()
    })
    .catch((err) => location.reload())
}
</script>

<template>
  <div id="login-anticlick" v-if="!storedUsername">
    <div id="login">
      <p id="login-title">Choose a name</p>
      <input type="text" id="login-input" name="username" maxlength="17" v-model="username" />
      <button id="login-button" @click="createAccount()">Start</button>
    </div>
  </div>
  <header id="header">
    <div id="stats">
      <div>
        <p>{{ storedUsername }}</p>
      </div>
      <div class="ressources">
        <p>{{ `${Math.floor(studentNumber.student)}` }} Students 🧑‍🎓</p>
        <p>{{ `${studentNumber.mainCoef / 5}` }} student(s)/sec</p>
      </div>
      <div class="ressources">
        <p>Money 💰{{ `${Math.floor(money.money)}` }}</p>
        <p>{{ money.moneyCoef }} money(s)/student</p>
      </div>
    </div>
    <nav id="navigation">
      <RouterLink to="/">Upgrade</RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>
      <RouterLink to="/shop">Shop</RouterLink>
      <RouterLink to="/success">Success</RouterLink>
    </nav>
  </header>
  <div id="home">
    <section id="clicker">
      <div id="alert">
        <p id="popup-souvenir"></p>
      </div>
      <!-- <img src="/" alt="Image totally legal took from the discord channel Warning zone "/> -->
      <button @click="studentNumber.mainClick()" id="spam-button">Spam me for student</button>
      <!-- @eventGetSouvenir takes the probability in %, the number of students and the groups width -->
      <button @click="money.mainClick(studentNumber.student); inventory.eventGetSouvenir( 99, studentNumber.student, 60 + (studentNumber.mainCoef * 2) / 5);studentNumber.student = 0">
        Take students on a trip 🧑‍🎓</button
      ><!-- ajouter la fonction qui depense les etudiants pour donner de l'argent -->
      <button @click="studentNumber.reset">Reset game</button>
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

#login-anticlick {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

#login {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  width: 40vw;
  height: 50%;
  left: 30vw;
  top: 25vh;
}

#login-title {
  text-align: center;
  font-size: 40px;
  color: white;
}

#login-input {
  font-size: 35px;
  border-radius: 50px;
  padding: 1rem;
  margin: 2rem 0px;
}

#login-button {
  padding: 2rem;
  font-size: 35px;
  border-radius: 50px;
}

#login-button:hover {
  background-color: pink;
}

#alert {
  background-color: green;
  padding: 1rem;
  position: absolute;
  width: 60vw;
  display: none;
}

#popup-souvenir {
  color: white;
}

#stats {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 60%;
  padding: 1rem;
}

#navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 40%;
  height: 10vh;
  padding: 2rem;
}

template {
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

#spam-button {
  margin-top: 300px;
}
</style>
