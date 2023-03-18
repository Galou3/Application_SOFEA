<template>
  <body>
  <form @submit.prevent="handleSubmit">
    <h1> Se connecter à votre site préféré</h1>
    <p class ="choose-email">Connectez vous avec votre adresse mail</p>
    <div class="inputs">
      <input type = "email" placeholder="Email" v-model="email">
      <input type = "password" placeholder="Mot de passe" v-model="password">
      <input type = "name" placeholder="Name" v-model="name">
    </div>
    <p class="inscription"> Je n'ai pas de compte. Je m'en <a href="register"><span>crée</span></a> un </p>
    <div align="center">
      <button type="submit">Se connecter</button>
    </div>
  </form>

  </body>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {store} from "@/store/User";

const router = useRouter()
const email = ref('')
const name = ref('')
const password = ref('')
function handleSubmit() {
  fetch('http://localhost:3000/login', {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      password: password.value,
      email: email.value
    })
  })
      .then(res => {
        if(res.status!==200) {
          throw new Error(res)
        }
        return res.json()
      })
      .then(function (res)  {
        store.token = res.token

        router.push({ name: 'home' })
      })
      .catch(() => alert('mot de passe éronné'))
}


</script>