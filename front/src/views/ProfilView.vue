<template>

  <h1>Voici le pseudo de l'utilisateur décrypter : {{store.decryptedMessage}}</h1>
</template>


<script setup>
import { store } from "@/store/User";

function getprofil() {
  fetch('http://localhost:3000/profil?' + new URLSearchParams({
    token: store.token
  }), {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'GET'
  })
      .then(res => res.json())
      .then((res) => {
        const decryptedObject = JSON.parse(res.message);
        store.decryptedMessage = decryptedObject.name;
        console.log(res);
      }).catch((error) => {
    console.error("Error:", error);
    alert("Vous n'êtes pas connecté vous ne pouvez pas voir votre profil");
  });
}

getprofil();

</script>

