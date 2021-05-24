<template>
  <div class="search">
    <v-btn
      class="search mr-1"
      color="transparent"
      @click="searchDialog = true"
      small
      depressed
    >
      <v-icon>search</v-icon>
    </v-btn>
    <v-dialog
      v-model="searchDialog"
      scrollable
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
      ><v-card class="" elevation="" max-width="">
        <v-card-text>
          <v-text-field
            class="mt-6"
            label="Search String"
            clearable
            prepend-icon="search"
            v-model="searchString"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="ml-auto">
          <v-btn text @click="searchDialog = false" color="red"> Cancel </v-btn>
          <v-btn text @click="search"> Search </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      searchDialog: false,
      searchString: '',
    }
  },
  methods: {
    search() {
      if (this.searchString !== '') {
        if (
          this.$router.history.current.fullPath !== `/s/${this.searchString}`
        ) {
          this.$router.push(`/s/${this.searchString}`)
          location.reload()
        } else {
          this.searchDialog = false
        }
      }
    },
  },
}
</script>

<style scoped>
</style>