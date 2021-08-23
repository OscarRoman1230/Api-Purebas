<template>
  <v-app>
    <div v-if="loggedIn()">
      <v-app-bar
          color="dark accent-4"
          dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>My files</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          class="dark accent-4"
          absolute
          dark
          bottom
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              active-class="deep-grey--text text--darken-1"
          >
            <v-list-item v-for="(item, index) in routes" :key="index" :to="item.link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="blue" dark block @click="logout()">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-container>
        <router-view/>
      </v-container>
    </div>
    <div v-if="!loggedIn()">
      <v-container>
        <router-view/>
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    routes: [
      {title: 'Proyectos', link: '/home'},
      {title: 'Estados de tickets', link: '/ticket-status'}
    ]
  }),
  methods: {
    loggedIn () {
      return !!localStorage.getItem('token');
    },
    logout () {
      localStorage.clear()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
</style>
