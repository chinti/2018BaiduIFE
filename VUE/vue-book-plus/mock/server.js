let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')

// 获取轮播图 /sliders
let sliders = require('./sliders.js')

function read (callback) {
  fs.readFile((path.dirname(__filename) + '/book.json'), 'utf8', function (err, data) {
    // console.log(err)
    if (err || data.length === 0) {
      let arr = []
      callback(arr) // 编译器的eslint报错是真的烦
    } else {
      callback(JSON.parse(data))
    }
  })
}
// read(function (books) { // 代表所有图书
function write (data, cb) { // 写入内容
  fs.writeFile((path.dirname(__filename) + '/book.json'), JSON.stringify(data), cb)
}
// write({}, function () {
//   console.log('写入成功')
// })
let pageSize = 5 // 每页显示5个

//   console.log(books)
// })
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  if (req.method === 'OPTIONS') return res.end()/* 让options请求快速返回 */
  let { pathname, query } = url.parse(req.url, true) // true把query化成对象

  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0
    read(function (books) {
      let result = books.reverse().slice(offset, offset + pageSize)
      let hasMore = true // 默认具有更多

      if (books.length <= offset + pageSize) {
        hasMore = false
      }
      // let hasMore = (books.length <= (offset + pageSize)) ? false : true
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      setTimeout(() => {
        res.end(JSON.stringify({hasMore, books: result}))
      }, 500)
    })
    return
  }
  if (pathname === '/sliders') {
    res.setHeader('Content-Type', 'application/json;charset=utf8')
    return res.end(JSON.stringify(sliders)) // nodejs
  }
  if (pathname === '/hot') {
    read(function (books) {
      let hot = books.reverse().slice(0, 6)
      res.setHeader('Content-Type', 'application/json;charset=utf8')
      setTimeout(() => {
        res.end(JSON.stringify(hot))
      }, 500)
    })
    return
  }
  if (pathname === '/book') {
    let id = parseInt(query.id) // 取出的字符串
    switch (req.method) { // ?id=1
      case 'GET':
        if (!isNaN(id)) {
          read(function (books) {
            let book = books.find(item => item.bookId === id)
            if (!book) book = {} // 若没找到则undefined
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            res.end(JSON.stringify(book))
          })
        } else { // 获取所有图书
          read(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8')
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break
      case 'POST':
        let str = ''
        req.on('data', (chunk) => {
          str += chunk
        })
        req.on('end', () => {
          let book = JSON.parse(str)
          read(function (books) {
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1
            books.push(book)
            write(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        })
        break
      case 'PUT':
        if (id) { // 获取当前要修改的id
          let str = ''
          req.on('data', (chunk) => {
            str += chunk
          })
          req.on('end', () => {
            let book = JSON.parse(str) // book 要改成什么样子
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) { // 找到id相同的哪一本书
                  return book
                }
                return item
              })
              write(books, function () {
                res.end(JSON.stringify(book))
              })
            })
          })
        }
        break
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id)
          write(books, function () {
            res.end(JSON.stringify({})) // 删除返回空对象
          })
        })
        break
    }
    return
  }
  // 读取一个路径
  fs.stat(path.dirname(__filename) + pathname, function (err, stats) {
    if (err) {
      // res.statusCode = 404
      // return res.end('NOT FOUND ')
      let p = require('path').join(path.dirname(__filename) + pathname, '../index.html')
      fs.createReadStream(p).pipe(res)
    } else { // 若是目录报错
      if (stats.isDirectory()) {
        let p = require('path').join(path.dirname(__filename) + pathname, './index.html')
        fs.createReadStream(p).pipe(res)
        // let readStream = fs.createReadStream(p)
        // console.log(readStream)
      } else {
        fs.createReadStream(path.dirname(__filename) + pathname).pipe(res)
        // let readStream = fs.createReadStream(path.dirname(__filename) + pathname)
        // console.log(readStream)
      }
    }
  })
}).listen(3000)
