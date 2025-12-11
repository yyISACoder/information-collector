import { createI18n } from 'vue-i18n'

import zh_CN from './zh-CN'
import en from './en'

// 语言库
const messages = {
  'zh-CN': zh_CN,
  en
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages
})

export default i18n
