<template>
  <v-app>
    <v-main style="padding: 0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend+Mega&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  font-family: 'Lexend Mega', sans-serif;
}

::selection {
  background-color: #e4e4e4;
}

a {
  color: #000 !important;
  text-decoration: none !important;
}
</style>