import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.css'
const app = createApp(App)
app.config.globalProperties.$editor = null

app.use(store).use(router).mount('#app')
