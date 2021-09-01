<template>
  <v-app style="background: #e0e0e0">
    <div v-if="loggedIn()">
      <v-app-bar
          app
          color="dark accent-4"
          dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          class="dark accent-4"
          app
          absolute
          dark
          bottom
          temporary
      >
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
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
          <div>
            <v-btn color="blue" dark block @click="logout()">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-container>
        <v-content>
          <router-view/>
        </v-content>
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
      {title: 'Inicio', link: '/home'},
      {title: 'Mis Publicaciones', link: '/my-published'}
    ],
    user: JSON.parse(localStorage.getItem('user'))
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
