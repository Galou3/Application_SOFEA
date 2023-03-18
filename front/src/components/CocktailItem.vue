<template>
  <div class="cocktail-item">
    <img :src="cocktail.image" :alt="cocktail.name" class="cocktail-image" />
    <div class="buttons">
      <button class="like-button" @click="likeCocktail">Like</button>
      <button class="dislike-button" @click="dislikeCocktail">Dislike</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
  },
  methods: {
    likeCocktail() {
      console.log("Cocktail Liked");
    },
    dislikeCocktail() {
      console.log("Cocktail Disliked");
    },
  },
};
</script>


