<template>
  <div class="cocktail-item">
    <h3>{{ cocktail.name }}</h3>
    <img :src="cocktail.url" :alt="cocktail.name" class="cocktail-image" />

  </div>
</template>
<script setup >
defineProps(['cocktail'])

</script>


