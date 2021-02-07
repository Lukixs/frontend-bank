import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'
import Login from './components/Login/Login.vue'
import Register from './components/Register/Register.vue'
import Transfer from './components/Transfer/Transfer.vue'
import History from './components/History/History.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/transfer', component: Transfer},
        {path: '/history', component: History}
    ]
})