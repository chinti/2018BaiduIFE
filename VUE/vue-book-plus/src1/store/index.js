import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger' // 日志插件
import mutations from './mutations'

Vue.use(Vuex)
// 容器是唯一的
const state = { count: 0 }
const getters = {
  val: (state) => state.count % 2 ? '奇数' : '偶数'
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [
    logger()
  ],
  strict: true // 只能通过mutation来更改状态
})
