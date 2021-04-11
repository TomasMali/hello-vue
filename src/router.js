import { createRouter, createWebHistory } from 'vue-router'

import PagePubblic from './components/pubblic/PagePubblic.vue'
import PagePrivate from './components/private/PagePrivate.vue'
import UserRegister from './pages/auth/UserRegister.vue'
import UserLogin from './pages/auth/UserLogin.vue'
import NotFound from './pages/NotFound.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/public' },
        { path: '/public', component: PagePubblic },
        { path: '/private', component: PagePrivate },

        { path: '/register', component: UserRegister },
        { path: "/login", component: UserLogin },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});




export default router