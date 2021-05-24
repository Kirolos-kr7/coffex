<template>
  <div class="about page">
    <Navbar />
    <v-container>
      <v-row>
        <v-col class="mt-4">
          <p class="headine">About Coffex.</p>
          <p class="headine">About Coffex.</p>
          <p class="headine">About Coffex.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "About",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 105px 0 0 0;
}
</style>

