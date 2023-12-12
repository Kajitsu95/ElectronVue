import { createApp } from 'vue'
import App from './App'

import components from '@/components/UI'

const app = createApp(App)

Object.entries(components).forEach(([name, component]) =>
 app.component(name, component))

app.mount('#app')

