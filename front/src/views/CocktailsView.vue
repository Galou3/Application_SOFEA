<template>
  <h1>Nos meilleures recettes !</h1>
  <p>Si il n'y a pas d'image c'est que la base de donnée est vide vous pouvez ajouter
   un cocktail avec : Créer un nouveau coktail </p>
  <div class="cocktails-container">
    <CocktailItem v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import CocktailItem from "@/components/CocktailItem.vue";

// utiliser ref pour accéder à la variable dans la balise template
const cocktails = ref([])

function getCocktails() {
  fetch("http://localhost:3000/cocktails")
      .then(res => res.json())
      .then(res => cocktails.value = res)
      .catch(err => {
        console.log(err)
        alert("Erreur lors du chargement de la page")
      })
}

getCocktails()
</script>