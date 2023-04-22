<template>

  <h1>Si vous voulez voir votre profil connecter vous </h1>
  <h2>Voici le pseudo de l'utilisateur décrypter : {{store.decryptedMessage}}</h2>
</template>


<script setup>
import {store} from "@/store/User";
import {useRouter} from "vue-router";
const router = useRouter()

if (!store.token){
  router.push({ name: 'login' })
}

function getprofil() {
  fetch('http://localhost:3000/profil?', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.token}`
    },
    method: 'GET'
  })
      .then(res => res.json())
      .then((res) => {
        store.decryptedMessage = res.name;
      }).catch((error) => {
    console.error("Error:", error);
    alert("Vous n'êtes pas connecté vous ne pouvez pas voir votre profil");
  });
}

getprofil();

</script>

