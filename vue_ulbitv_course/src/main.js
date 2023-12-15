import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from './router'
import directives from '@/directives'

const app = createApp(App).use(router)

Object.entries(components).forEach(([name, component]) =>
 app.component(name, component))

 Object.entries(directives).forEach(([name, directive]) =>
 app.directive(name, directive))

app.mount('#app')

