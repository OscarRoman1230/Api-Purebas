import Vue from 'vue'
import Router from 'vue-router'

// Componentes
import  list from '@/components/List';

Vue.use(Router);

const route = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'list',
            component: list
        }
    ]
})

export default route;
