import { createApp } from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import i18n from './lang'
import './assets/style/iconfont.css'
import './assets/style/reset.scss'
import 'element-plus/es/components/message/style/css'
//import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
app.mount('#root')
