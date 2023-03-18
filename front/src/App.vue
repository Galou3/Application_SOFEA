<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'cocktails' }">Cocktails</router-link> |
    <router-link :to="{ name: 'create-cocktail' }">Créer un nouveau cocktail</router-link> |
    <router-link :to="{ name: 'register' }">Créer un compte</router-link> |
    <router-link :to="{ name: 'login' }">Connecter</router-link> |
    <router-link :to="{ name: 'profil' }">Profil</router-link>
  </nav>
  <router-view/>
</template>

<style>

</style>