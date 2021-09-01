<template>
  <div>
    <v-container>
      <list-my-publication />
    </v-container>
  </div>
</template>

<script>
import listMyPublication from "../components/publications/listMyPublication";
export default {
  name: 'MyPublished',
  components: {
    listMyPublication
  }
}
</script>

<style scoped>

</style>
