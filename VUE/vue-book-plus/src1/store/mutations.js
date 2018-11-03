import * as Types from './mutations-types'
const mutations = {
  [Types.INCREMENT] (state, count) { // state自动放入，默认指向当前state
    state.count += count
  },
  [Types.DECREMENT] (state) { // state自动放入，默认指向当前state
    state.count -= 1
  }
}
export default mutations

// 宏 快捷键
