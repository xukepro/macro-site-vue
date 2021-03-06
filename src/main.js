import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './assets/iconfont/iconfont.css'

import 'github-markdown-css/github-markdown.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

// 如果开启了typescript 需要额外安装 npm install @types/highlight.js
// 通过 import * as hljs from 'highlight.js' 引入
Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

import '@/icons' // icon
import '@/permission' // permission control
import Modal from '@/components/modal'
// Modal.install = function(Vue) {
//   Vue.component(Modal.name, Modal)
// }

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(mavonEditor)
// Vue.use(Modal)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
