import { createApp } from 'vue'
import App from './App'
import router from './routes/index'
import store from './store/index'
import './assets/style/iconfont.css'
import './assets/style/reset.scss'
import 'element-plus/es/components/message/style/css'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#root')
