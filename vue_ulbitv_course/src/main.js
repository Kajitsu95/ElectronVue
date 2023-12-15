import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from './router'

const app = createApp(App).use(router)

Object.entries(components).forEach(([name, component]) =>
 app.component(name, component))

app.mount('#app')

