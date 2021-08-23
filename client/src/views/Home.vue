<template>
  <div>
    <v-container>
      <list-projects />
    </v-container>
  </div>
</template>

<script>
import listProjects from "../components/project/listProjects";

export default {
  name: 'Home',
  components: {
    listProjects
  }
}
</script>
