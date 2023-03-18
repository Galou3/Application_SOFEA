<template>
  <h1>Créer un nouveau cocktail</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nom du cocktail</label>
      <input id="name" type="text" v-model="name">
    </div>

    <div>
      <label for="image">Image du cocktail</label>
      <input id="image" type="text" v-model="src">
    </div>

    <div>
      <button type="submit">Créer cocktail</button>
    </div>
  </form>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const name = ref('')
const src = ref('')

function handleSubmit() {
  fetch('http://localhost:3000/cocktails', {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      name: name.value,
      src: src.value,
    })
  })
      .then(res => res.json())
      .then(() => {
        router.push({
          name: 'cocktails'
        })
      })
}
</script>