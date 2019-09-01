// 本节，我们来讲一讲js中的高阶函数
// 所谓高阶函数，即普通函数中，函数的入参是一个函数，返回另一个函数。
// 如果入参为一个时，称之为科里化； 入参为多个时，称之为偏函数；
// 下面，我们以一个判断数据类型的例子来加以说明
// 1) 普通实现
const isType = (val, type) => {
  return Object.prototype.toString.call(val).includes(type)
}
const testString = 'hello'
// console.log(isType(null, 'Null'))
// 2) 使用高阶函数实现： 
// 2-1 ) 先把数据类型列出，构造出类 
// let fnsClass = {
//   [type]: isType2(type) // fns(type) 为传入type后返回函数的高阶函数方法
// }
// 通过类对象方法执行传入值去执行函数fnsClass[type](val)
const typeArray = ['String', 'Number', 'Boolean', 'undefined', 'Null', 'Array']
const isType2 = (type) => {
  return function (val) {
    return Object.prototype.toString.call(val).includes(type)
  }
}
let fns = {}
typeArray.forEach(item => {
  fns['is' + item] = isType2(item)
})
// 使用：fns(type)(val)
console.log(fns.isNumber(123)) // true

// 接下来，我们来实现一个多少次后执行的函数
// 假设我们要实现一个函数after,传入执行次数和回调，要求执行三次后才执行
// 实现after
const after = (count, callback) => { // 第二步
  return function () {
    if (--count === 0) {
      callback()
    } else {
      console.log('no-callback')
    }
  }
}
const fn = after(3, function () { // 第一步：高阶函数中，先制定如何使用，再想如何实现
  console.log('after')
})
// 调用
// fn()
// fn()
// fn()

// 第三部分，我们来了解一下AOP, 面向切片编程，即把代码切分成片，在中间加入我们自己的代码，与之相关的是装饰器（拓展/改写原有方法）
// eg. 
// 原有代码
function originFn (val='') {
  console.log(val + 'i am origin code')
}
// 目标： 通过调用before方法去把要执行的回调传过去originFn.before(xxx)
Function.prototype.before = function (fn) {
  return (...args) => {
    fn()
    this(...args)
  }
}
// 执行
const newFn = originFn.before(function () {
  console.log('new code ---')
})
// newFn('我写的')

// 第四部分，高阶函数能解决的问题场景： 1、参数预置；2异步问题
// 以下我们来讲一讲异步的问题: 通过执行完全部的请求后，执行打印请求
const fs = require('fs')
fs.readFile('./text1.txt', 'utf-8', (err, data) => {
  // console.log(data)
  newDealFns(data)
})
fs.readFile('./text2.txt', 'utf-8', (err, data) => {
  // console.log(data)
  newDealFns(data)
})
// 利用after对异步操作进行执行
// after(2, cb)
// 
function afterDeal (count, cb) {
  let arr = []
  return function (data) {
    arr.push(data)
    if (--count === 0) {
      cb(arr)
    }
  }
}
newDealFns = afterDeal(2, function (res) { // 传入数目，回调信息
  console.log(res)
})
