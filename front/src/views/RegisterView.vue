<template>
  <h1>Inscription</h1>
  <form @submit.prevent="handleSubmit">
    <h1>Inscrivez vous</h1>
    <div class="inputs">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="name" placeholder="Name" v-model="name">
    </div>
    <div align="center">
      <button type="submit">S'inscrire</button>
    </div>
  </form>
</template>
<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const email = ref("")
const password = ref("")
const name = ref("")

function handleSubmit() {
  fetch('http://localhost:3000/register', {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  })
      .then(res => res.json())
      .then(() => {
        router.push({
          name: 'cocktails'
        })
      }).catch((error) => {
    console.error("Error:", error);
    alert("Nous n'avons pas pu créer votre compte")
  });
}

</script>