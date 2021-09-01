<template>
  <div>
    <v-container>
      <list-publications />
    </v-container>
  </div>
</template>

<script>
import listPublications from "../components/publications/listPublications";

export default {
  name: 'Home',
  components: {
    listPublications
  }
}
</script>
