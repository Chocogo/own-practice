// 本节我们来讲一讲发布订阅模式和观察者模式
// 一、发布订阅模式: 发布者，订阅者
function Event () {
  this.callbacks = [] // 订阅事件数组
  this.results = [] // 发布数据数组
}
Event.prototype.on = function(cb) { // 订阅： 保存所有订阅函数, 📱
  this.callbacks.push(cb)
}
Event.prototype.emit = function(result) { // 发布: 存入数据后，并激活每个订阅函数回调
  this.results.push(result)
  this.callbacks.forEach(cb => cb(this.results))
}
const event = new Event()
// 订阅
event.on(function (arr) { // 订阅后要执行的回调
  if (arr.length === 2) {
    console.log(arr)
  }
})

// 模拟事件
setTimeout(() => {
  event.emit('hello')
}, 1000)

setTimeout(() => {
  event.emit('world')
}, 1000)

// 二、观察者模式，理解是观察者模式是基于发布订阅模式，区分于观察者模式是主要用于监听观察数据的变动，通知观察者，发布订阅模式主要
// 是事件在特定需要执行的时候，触发发布，由订阅接收后执行回调
// 被观察者： 必须包含观察者
class Subject {
  constructor () {
    this.observes = [] // 观察者
    this.state = '心情好' // 观察的状态
  }
  // 暴露观察者方法入口
  applyObserve (val) {
    console.log('孩子本来是：' + this.state) // 保存上一个状态信息
    this.observes.push(val)
  }
  // 通知更新心情状态
  updateState (state) {
    this.state = state
    this.observes.forEach(item => item.callback(state))
  }
}
// 观察者
class Observe {
  constructor (name) {
    this.name = name
  }
  // 观察者的回调
  callback (state) {
    console.log('后来，', this.name + '知道了孩子的状态是' + state)
  }
}
// 实例观察者
let father = new Observe('爸爸')
let mother = new Observe('妈妈')
// 实例化孩子
let child = new Subject()
// 传入
child.applyObserve(father)
// 孩子心情状态跟新
child.updateState('想哭')
child.applyObserve(mother)
child.updateState('笑了')



